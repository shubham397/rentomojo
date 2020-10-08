import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Card, Radio} from 'antd';
import axios from 'axios';
import './index.css'
import 'antd/dist/antd.css';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const App = () => {

  const [user, setUser] = useState(null);
  const [randomQuestion, setRandomQuestion] = useState(0);
  const lastRandom = useRef(randomQuestion)
  
  const timer = useRef(60);
  const divTimer = useRef();
  const timerCount = useRef();

  const questionCount = useRef(1);
  const question = useRef("");
  
  const active = useRef(false);
  const optionChecked = useRef("");

  const divQuestion = useRef();
  const divScore = useRef();


  useEffect(()=>{
    axios.get('https://infinite-forest-32394.herokuapp.com/question/getQuestion')
    .then(function (response) {
      question.current = response.data.result;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  },[])

  const onFinish = values => {
    setUser(values);
    localStorage.setItem("userName", values.username);
    console.log('Success:', values);
    changeTimer();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const FormController = ()=>{
    return (<Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>);
  }

  const changeTimer = ()=>{
    try {
      divTimer.current.innerText = `Countdown: ${timer.current} Seconds`;
    } catch (error) {
      console.log(error);
    }
    if(timer.current>0){
      timer.current = timer.current-1;
      timerCount.current = setTimeout(changeTimer, 1000);
    }
    else{
      onNewClick("skip");
    }
  }

  function onChange(e) {
    optionChecked.current = e.target.value;
    let currentPoint = parseInt(localStorage.getItem("score"));
    currentPoint++;
    if(optionChecked.current == question.current[randomQuestion].answer){
      localStorage.setItem("score",currentPoint);
    }
    active.current = true;
  }

  const saveScore = () =>{
    const user = {
      name: localStorage.getItem("userName"),
      score: localStorage.getItem("score"),
    };
    axios.post('https://infinite-forest-32394.herokuapp.com/user/addUser', { user })
    .then(function (response) {
      console.log(response.data.status);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const onNewClick = (text) => {
    timer.current = 60;
    if(questionCount.current>14){
      saveScore();
      try {
        divQuestion.current.style.display = "none";
        divScore.current.style.display = "block";
      } catch (error) {
        console.log(error)
      }
      return;
    }
    if(active.current || text==="skip"){
      timer.current = 60;
      clearTimeout(timerCount.current);
      changeTimer();

      questionCount.current = questionCount.current+1;

      let random = Math.floor((Math.random() * 10));
      while(lastRandom.current === random){
        random = Math.floor((Math.random() * 10));
      }
      lastRandom.current = random;
      setRandomQuestion(lastRandom.current);
      
      active.current = false
    }
    else{
      alert("Select any one")
    }
  };

  const QuestionComponent= ()=>{
    
    return (
      <div>
        <div ref={divQuestion} className="site-card-border-less-wrapper">
          <h3>Question No. -&gt; {questionCount.current}</h3>
          <div ref={divTimer}>Countdown: {timer.current} Seconds</div>
          <Card title={`${question.current[randomQuestion].question}`} bordered={false}>
            <Radio.Group onChange={onChange}>
              <Radio disabled={active.current} value="0">A. {question.current[randomQuestion].options[0]}</Radio>
              <br/>
              <Radio disabled={active.current} value="1">B. {question.current[randomQuestion].options[1]}</Radio>
              <br/>
              <Radio disabled={active.current} value="2">C. {question.current[randomQuestion].options[2]}</Radio>
              <br/>
              <Radio disabled={active.current} value="3">D. {question.current[randomQuestion].options[3]}</Radio>
            </Radio.Group>
              <br/>
              <br/>
            <Button onClick={()=>{onNewClick()}}>
              Submit
            </Button>
          </Card>
        </div>
        <div ref={divScore} style={{display:"none"}}>
          <h1>Your Score -&gt; {localStorage.getItem("score")}</h1>
        </div>
      </div>
      ) 
  }

  return (
    <div>
      {
        user?<QuestionComponent/>:<FormController />
      }
    </div>
  );
};

export default App;

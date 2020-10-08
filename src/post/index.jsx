import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button} from 'antd';
import 'antd/dist/antd.css';

import './index.css';
import {baseUrl} from '../util/url'

const App = () => {

  const [postData,setPostData] = useState([]);
  const [skip,setSkip] = useState(0);
  const [limit,setLimit] = useState(10);

  useEffect(()=>{
    const userId = window.location.href.split("/")[4];
    axios.get(`${baseUrl}/posts?userId=${userId}&skip=${skip}&limit=${limit}`)
      .then(function (response) {
        const data = response.data.map((newData)=>{
          return {id:newData.id, title:newData.title, body:newData.body}
        })
        setPostData(data);
      })
      .catch(function (error) {
        console.log(error);
      })
  },[skip, limit])

  function onClickBack(){
    window.history.back();
  }

  function onClickNext(){
    const newSkip = skip+10;
    const newLimit = limit+10;
    setSkip(newSkip);
    setLimit(newLimit);
  }

  function onClickPrevious(){
    const newSkip = skip-10;
    const newLimit = limit-10;
    setSkip(newSkip);
    setLimit(newLimit);
  }

  function onClickDiv(postId){
    window.location.href=`/postDetails/${postId}`;
  }

  return (
    <div className="mainDiv">
        <Button type="primary" shape="round" className="backBtn" onClick={onClickBack}>Back</Button>
        {postData.map((data)=>{
          return (
            <div className="titleDiv" onClick={()=>{onClickDiv(data.id)}}>
              <h1>
                {data.title}
              </h1>
              <h2>
                {data.body}
              </h2>
            </div>
          )
        })}
        <Button disabled={skip===0?true:false} shape="round" type="primary" onClick={onClickPrevious} style={{marginRight:"10px"}}>Previous</Button>
        <Button type="primary" shape="round" onClick={onClickNext}>Next</Button>
    </div>
  );
};

export default App;

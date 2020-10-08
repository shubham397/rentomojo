import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button} from 'antd';
import 'antd/dist/antd.css';

import './index.css';
import {baseUrl} from '../util/url'

const App = () => {

  const [postData,setPostData] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [commentData, setCommentData] = useState([]);

  useEffect(()=>{
    const data = [];
    const postId = window.location.href.split("/")[4];
    axios.get(`${baseUrl}/posts/${postId}`)
      .then(function (response) {
        data.push({id:response.data.id, title:response.data.title, body:response.data.body})
        setPostData(data);
      })
      .catch(function (error) {
        console.log(error);
      })
  },[])

  function onClickBack(){
    window.history.back();
  }

  function onClickComment(id){
    setShowComment(!showComment);
    if(commentData.length===0){
      axios.get(`${baseUrl}/posts/${id}/comments`)
      .then(function (response) {
        const data = response.data.map((newData)=>{
          return {name:newData.name, body:newData.body}
        })
        setCommentData(data);
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }

  function onClickDelete(id){
    axios.delete(`${baseUrl}/posts/${id}`)
      .then(function (response) {
        alert("Redirecting to Post Page")
        window.location.href=`/post/${id}`;
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <div className="mainDiv">
        <Button type="primary" shape="round" className="backBtn" onClick={onClickBack}>Back</Button>
        {postData.map((data)=>{
          return (
            <div className="titleDiv">
              <h1>
                {data.title}
              </h1>
              <h2>
                {data.body}
              </h2>
            </div>
          )
        })}
        <Button danger shape="round" onClick={()=>{onClickDelete(postData[0].id)}} style={{marginRight:"10px"}}>Delete</Button>
        <Button type="primary" shape="round" style={{marginBottom:"10px"}} onClick={()=>{onClickComment(postData[0].id)}}>{showComment?"Hide Comments":"Show Comments"}</Button>
        {showComment?
          commentData.map((data)=>{
            console.log(data);
            return (
              <div className="commentDiv">
                <h1>{data.name}</h1>
                <h2>{data.body}</h2>
              </div>
            )
          })
          :
          ""
        }
    </div>
  );
};

export default App;

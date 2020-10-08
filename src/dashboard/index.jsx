import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table} from 'antd';
import 'antd/dist/antd.css';

import './index.css';
import {baseUrl} from '../util/url'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Company',
    dataIndex: 'companyName',
    key: 'company',
  },
  {
    title: 'Website',
    dataIndex: 'blog',
    key: 'website',
  }
];

const App = () => {

  const [tdata,setTdata] = useState("");

  useEffect(()=>{
    axios.get(`${baseUrl}/users`)
      .then(function (response) {
        const data = response.data.map((newData)=>{
          return {name:newData.name, companyName:newData.company.name, blog:newData.website, userId:newData.id}
        })
        setTdata(data);
      })
      .catch(function (error) {
        console.log(error);
      })
  },[])

  function onRowClick(userId){
    console.log(userId);
    window.location.href=`/post/${userId}`;
  }

  return (
    <div className="mainDiv">
        <h1>RentoMojo FrontEnd Assignment</h1>
        <Table
          className="userTable"
          columns={columns} 
          dataSource={tdata} 
          pagination={false} 
          onRow={(tdata)=>{
            return{
              onClick:()=>{onRowClick(tdata.userId)}
            }
          }}
          />
    </div>
  );
};

export default App;

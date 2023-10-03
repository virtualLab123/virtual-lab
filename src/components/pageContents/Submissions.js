import { Space, Table, Tag } from "antd";
import { useContext, useEffect, useState } from "react";
import { api } from "../../constants";
import userContext from "../../contextStore/context";
import axios from "axios";
const Submissions = () => {
  const {user,experiments}=useContext(userContext)
  const [submissions,setSubmissions] = useState([])
  useEffect(()=>{
    axios.get(`${api}/submissions?filters[roll][$eqi]=${user.roll}&populate=*`).then((response)=>{
      setSubmissions(response.data.data[0].attributes.Experiments.map((sub)=>{
          const id=experiments.findIndex((el)=>el.expNo===sub.ExpNo)
          const exp=experiments[id]
          console.log(exp)
          return {
            key: sub.ExpNo,
            expId: sub.ExpNo,
            expName: exp.expTitle,
            lastSub: sub.Submitted_Date,
            status:"graded",
            timeliness:new Date(sub.Submitted_Date)<new Date(exp.Due)?"timely":"overdue"
          }
      }))
    })
  },[])
  const columns = [
    {
      title: "Experiment Id",
      dataIndex: "expId",
      key: "expId",
      render: (text) => <a>{text}</a>,
      width:"20%"
    },
    {
      title: "Experiment Name",
      dataIndex: "expName",
      key: "expName",
      width:"20%"

    },
    {
      title: "Last Submitted",
      dataIndex: "lastSub",
      key: "lastSub",
      width:"20%"

    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
        let color = status === "unGraded" ? "geekblue" : "green";
        return (
        
              <Tag color={color} key={status}>
                {status.toUpperCase()}
              </Tag>
            
        );
      },
      width:"20%"
    },
    {
      title: "Timeliness",
      key: "timeliness",
      dataIndex:"timeliness",
      render: (_, { timeliness }) => {
        let color = timeliness === "overdue" ? "red" : "green";
        return (
        
              <Tag color={color} key={timeliness}>
                {timeliness}
              </Tag>
            
        );
      },
      width:"20%"

    },
  ];
  const data = [
    {
      key: "1",
      expId: "1",
      expName: "sum of two numbers",
      lastSub: "2023-09-24 15:30:45",
      status:"graded",
      timeliness:"timely"
    },
    {
        key: "2",
        expId: "2",
        expName:"Palindrome",
        lastSub: "2023-09-24 15:30:45",
        status:"unGraded",
        timeliness:"timely"
      },
      {
        key: "3",
        expId: "3",
        expName: "Substring extraction",
        lastSub: "2023-09-24 15:30:45",
        status:"graded",
        timeliness:"overdue"
      },
      {
        key: "4",
        expId: "4",
        expName: "right rotation of array",
        lastSub: "2023-09-24 15:30:45",
        status:"unGraded",
        timeliness:"timely"
      },
  ];
  return (
    submissions.length?<div className="w-full h-[calc(100vh-70px)] pt-[1rem]  bg-gray-100"> 
      <Table dataSource={submissions} columns={columns} className="w-full m-0"  pagination={{
      style:{visibility:"hidden"}
    }}
    scroll={{
        y:450
    }}
     />
    </div>:
    <p>loading</p>
  );
};
export default Submissions

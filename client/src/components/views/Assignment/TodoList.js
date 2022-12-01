import { InfoCircleFilled, UserAddOutlined } from '@ant-design/icons';
import {React, useState} from 'react'
import ToDoInsert from './TodoInsert';
import {Button} from 'antd';
// import Pagination from 'antd';
import Pagination from './Pagination';
import axios from 'axios';
// import { useState } from 'react';

function TodoList({contents, setvalue, setId}) {
    // console.log(contents)
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    let a = contents.length - offset +1;
    console.log(a)

    const clickchange = (content,id) => {
        // setcontents(content)
        console.log(content,id)
        setvalue(content)
        console.log("clickchange")
        setId(id);
        // axios.post("http://localhost:5000/ass/change", null, {
        //     params: {
        //         'content' : content,
        //         'id': id
        //     }
        // })
    }

    const clickdelete = (id) => {
        console.log(id);
         axios.post("http://localhost:5000/ass/delete", null, {
            params: {
                'id': id
            }
        })
        setId(-1);
        window.location.replace("/assignment");

    }
    return (
    <div  style={{ textAlign: 'center' }}>
    <div style = {{textAlign: 'left', paddingRight: 20}}>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;글번호 
    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;내용
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   입력날짜
    </div>
    <div >
        {contents.slice(offset,offset+limit).map((info,idx) => (
                    
                <div style={{
                    padding: 20, paddingRight: 20, marginRight: 20}} key = {info.id}>
                    {--a} &nbsp;&nbsp;&nbsp;&nbsp;
                    {/* {info.id} */}
                    {info.content}  &nbsp;&nbsp;&nbsp;&nbsp;
                    {(info.date)} &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button onClick={() =>clickchange(info.content,info.id)}>수정</Button>
                    <Button onClick = {() => clickdelete(info.id)}>삭제</Button>
                </div>
            
        ))}
    </div>
    <footer>
        <Pagination
          total={contents.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </div>


  )
}

export default TodoList;
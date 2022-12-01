import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
// import { Flex } from "react-flex";
import ToDoInsert from "./TodoInsert";
import TodoList from "./TodoList";

function Assignment() {
  
  const [contents, setcontents] = useState([])
  const [insertion, setinsertion] = useState("");
  const [Id, setId] = useState(-1);

 useEffect(() => {
  axios.post("http://localhost:5000/ass/getcontent")
  .then(response => {
    // console.log(response.data)
    setcontents(response.data)
    // console.log(contents)
    setId(-1)
  }
  )
  // console.log(contents)

 },[])
    
  // console.log(contents)
  const [todos, setTodos] = useState([
    {
      text: "리액트 기초 알아보기",
    },
    {
      text: "컴포넌트 스타일링 하기",
    },
    {
      text: "투두리스트 만들기",
    },
  ]);

  const [value, setvalue] = useState('');
  
  const onInsert = useCallback((text) => {
    const todo = {
      text,
    };
    setTodos((todos) => todos.concat(todo));
    // console.log(text);
    // console.log(todos);
  });

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <ToDoInsert onInsert={onInsert} value = {value} setvalue = {setvalue} Id={Id} setId = {setId}/>
      <TodoList contents = {contents} setvalue = {setvalue} setId = {setId}/>
      
       
    </div>
  );
}

export default Assignment;

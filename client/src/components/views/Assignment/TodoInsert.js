import axios from "axios";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";

function ToDoInsert({ onInsert ,value,setvalue, Id, setId}) {
  const onChange = useCallback((e) => {
    // console.log(e.target.value);
    setvalue(e.target.value);
    // console.log(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    onInsert(value);
    axios.post("http://localhost:5000/ass/upload", null, {
      params : {
        'content': value,
        'id': Id
      }
    })
    setId(-1)
    setvalue('');
    
    // e.preventDefault();
   
  }, [onInsert, value]);

  return (
    <form
      className="TodoInsert"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
      onSubmit={onSubmit}
    >
      <input
        style={{ width: "70%" }}
        onChange={onChange}
        value={value}
        placeholder="할 일을 입력하세요"
      />
      <button type="submit">입력</button>
    </form>
  );
}

export default ToDoInsert;

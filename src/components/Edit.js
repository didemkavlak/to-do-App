import {useEffect, useState} from 'react'

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux' 
import { useParams  } from 'react-router-dom'
import { editTodoAsync, getIdTodosAsync} from '../redux/todos/services'
import {
  BrowserRouter as Router,
  Switch,
  useLocation, 
} from "react-router-dom";


function Edit(prop) {

  
  const items = useSelector((state) => state.todos.items);
  const [editTodo, setEditTodo] = useState(items.content);

  const {id} = useParams();
  console.log(id);

  const dispacth = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispacth(editTodoAsync({ id , editTodo })); 
    setEditTodo(' ');
  };



  return (
    <div>
        <h1>Edit</h1>
        <li className="todo-list">

                <form onSubmit = {handleSubmit } style={{display: "flex", alignItems: "center"}}>
                
                <input className="new-todo"  value={editTodo} placeholder="What needs to be done?" autoFocus
                onChange = {(e) => setEditTodo(e.target.value)}
                //onChange={() => handleEdit(items.id, items.content)}
                
                required minLength={3}/>

                <button className="destroy"
                onClick={() => handleSubmit(items.id, items.content)}
                 >edit</button>
                
                </form>

        </li>
    </div>
    
  )
}

export default Edit

/*

 const {id, content} = useParams();
    const item = useSelector((state) => state.todos.items.content);

    console.log(id);

    const dispacth = useDispatch();

/////


  const index = items.findIndex(item => item.id === id);
  const deger = items[index].content;

*/
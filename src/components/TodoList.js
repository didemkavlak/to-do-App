import {useEffect} from 'react';
import {useState} from 'react';
import Loading from './Loading';
import Error from './Error';

import { useSelector, useDispatch } from 'react-redux' 
import {selectFilteredTodods} from '../redux/todos/todosSlice';
import { getTodosAsync, toggleTodoAsync, removeTodoAsync, editTodoAsync } from '../redux/todos/services'


import {Link} from 'react-router-dom'


function TodoList() {

    const dispacth = useDispatch();
   

    const filteredTodos =  useSelector(selectFilteredTodods);
    const isLoading = useSelector(state => state.todos.isLoading); 
    const error = useSelector(state => state.todos.error); 


    useEffect(() => {
        dispacth(getTodosAsync());
    }, [dispacth])



    const handleDestroy = async (id) => {
        if(window.confirm('Are you sure?'))
        {
        await dispacth(removeTodoAsync(id))
        }
    };

    const handleToggle = async(id, isCompleted) => {
        await dispacth(toggleTodoAsync({id, data:{isCompleted}}))
    }

    const handleEdit= async (id, content)=>{
        await dispacth(editTodoAsync({id, data:{content}}))
    }



    if(isLoading){ 
        return <Loading />;
    }

    if(error){ 
        return <Error message={error}/> 
    }


  return (
    <ul className="todo-list">

            {filteredTodos.map((item) =>(
                
                <li key={item.id} className={item.isCompleted ? 'completed' : ''}>
                    <div className="view">
                        <input className="toggle" type="checkbox" checked={item.isCompleted} onChange={() => handleToggle(item.id, !item.isCompleted)}/>
                        <label>{item.content}</label>
                        <button className="destroy" onClick={() => handleDestroy(item.id)}></button>


                        <button className="myEdit" >

                            <Link to={`/edit/${item.id}`} >Edit</Link>

                        </button>
                
                    </div>
                </li>

            ))}
		</ul>
  )
}

export default TodoList


/*
import {useEffect} from 'react';
import React from 'react';
import Loading from './Loading';
import Error from './Error';

import { useSelector, useDispatch } from 'react-redux' 
import {selectFilteredTodods} from '../redux/todos/todosSlice';
import { getTodosAsync, toggleTodoAsync, removeTodoAsync, editTodoAsync } from '../redux/todos/services'


import {Link} from 'react-router-dom'




function TodoList() {

    const dispacth = useDispatch();
   

    const filteredTodos =  useSelector(selectFilteredTodods);
    const isLoading = useSelector(state => state.todos.isLoading); 
    const error = useSelector(state => state.todos.error); 


    useEffect(() => {
        dispacth(getTodosAsync());
    }, [dispacth])

    const handleDestroy = async (id) => {
        if(window.confirm('Are you sure?'))
        {
        await dispacth(removeTodoAsync(id))
        }
    };

    const handleToggle = async(id, isCompleted) => {
        await dispacth(toggleTodoAsync({id, data:{isCompleted}}))
    }

    const handleEdit= async (id, content)=>{
        await dispacth(editTodoAsync({id, data:{content}}))
    }

    if(isLoading){ 
        return <Loading />;
    }

    if(error){ 
        return <Error message={error}/> 
    }


  return (
    <ul className="todo-list">

            {filteredTodos.map((item) =>(
                
                <li key={item.id} className={item.isCompleted ? 'completed' : ''}>
                    <div className="view">
                        <input className="toggle" type="checkbox" checked={item.isCompleted} onChange={() => handleToggle(item.id, !item.isCompleted)}/>
                        <label>{item.content}</label>
                        <button className="destroy" onClick={() => handleDestroy(item.id)}></button> 


                        <button className="destroy" onClick={() => handleEdit(item.id, item.content)}>
                            <Link to={`/edit/:${item.id}`}>Edit</Link>
                        </button>
                  

                    </div>
                </li>

            ))}
		</ul>
  )
}

export default TodoList


*/
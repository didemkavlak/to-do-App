import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return res.data;
});

export const getIdTodosAsync = createAsyncThunk('todos/getIdTodosAsync', async ({id, data}) => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`,data);
    return res.data;
});

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async(data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data); 
    return res.data;
});

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async({id, data})=>{
    const res = await axios.put(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
    return res.data;
});

export const removeTodoAsync = createAsyncThunk('todos/removeTodoAsync', async(id)=>{
    await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
    return id;
});

export const editTodoAsync = createAsyncThunk('todos/editTodoAsync',async ({id,data})=>{
    const res = await axios.put(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
    return res.data
})
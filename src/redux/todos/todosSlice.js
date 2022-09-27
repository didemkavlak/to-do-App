import { createSlice } from "@reduxjs/toolkit";
import { addTodoAsync, toggleTodoAsync, getTodosAsync, removeTodoAsync,editTodoAsync,getIdTodosAsync} from "./services";



export const todosSlice = createSlice({
        name: 'todos',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        activeFilter: localStorage.getItem('activeFilter'),
        addNewTodo:{
            isLoading: false,
            error: null,
        }
    },
    reducers: {

        changeActiveFilter: (state,action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted : (state) =>{
            const filtered = state.items.filter(item => item.isCompleted === false);
            state.items = filtered;
        }
    },
    extraReducers:{
        //get todos
        [getTodosAsync.pending]: (state, action)=>{ 
            state.isLoading = true; 
        },
        [getTodosAsync.fulfilled]: (state, action)=>{ 
            state.items = action.payload; 
            state.isLoading = false;
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
        //get by id
        [getIdTodosAsync.pending]: (state, action)=>{ 
            state.isLoading = true; 
        },
        [getIdTodosAsync.fulfilled]: (state, action)=>{ 
            state.items = action.payload; 
            state.isLoading = false;
        },
        [getIdTodosAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
        //add todo 
        [addTodoAsync.pending]: (state, action) => {
            state.addNewTodo.isLoading = true;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload);
            state.addNewTodo.isLoading = false;
        },
        [addTodoAsync.rejected]: (state, action) => {
            state.addNewTodo.error = false;
            state.addNewTodo.error = action.error.message;
        },
        //toggle todo
        [toggleTodoAsync.fulfilled]: (state, action) => {
            const {id, isCompleted} = action.payload;
            const index = state.items.findIndex(item => item.id === id);
            state.items[index].isCompleted = isCompleted;
        },
        //remove todo
        [removeTodoAsync.fulfilled]: (state, action) => {
            const  id = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            state.items.splice(index, 1); 
        },
        //edit todo
        [editTodoAsync.fulfilled]: (state,action) => {
            const {id, content} = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            state.items[index].content = content;
        }
    }

});

export const selectTodos = state => state.todos.items; 

//todolist filtered

export const selectFilteredTodods = (state) => {
    if(state.todos.activeFilter === 'all'){
        return state.todos.items;
    }

    return state.todos.items.filter((todo) =>
    state.todos.activeFilter === 'active' ? todo.isCompleted === false : todo.isCompleted === true
    )
}

export const {changeActiveFilter,clearCompleted} = todosSlice.actions;  
export default todosSlice.reducer;


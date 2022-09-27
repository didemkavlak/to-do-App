import {useState} from 'react';
import Loading from './Loading';
import Error from './Error';

import {useDispatch, useSelector} from 'react-redux';
import { addTodoAsync} from '../redux/todos/services'

function Form() {
  const [content, setContent] = useState('')
  const dispacth = useDispatch();
  const isLoading = useSelector(state => state.todos.addNewTodo.isLoading); 
  const error = useSelector(state => state.todos.addNewTodo.error);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispacth(addTodoAsync({ content })); 
    setContent(' ');
  };


  return (
    <form onSubmit = {handleSubmit } style={{display: "flex", alignItems: "center"}}>
        <input disabled={isLoading} className="new-todo" placeholder="What needs to be done?" autoFocus value={content} onChange = {(e) => setContent(e.target.value)} required minLength={3}/>
        
        {isLoading && <Loading />}
        {error && <Error message={error}/>}
        
    </form>
  )
}

export default Form


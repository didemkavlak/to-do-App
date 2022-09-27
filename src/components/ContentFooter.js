import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {changeActiveFilter, clearCompleted, selectTodos} from '../redux/todos/todosSlice'

function ContentFooter() {
	const dispacth = useDispatch();
	const items = useSelector(selectTodos); //initial state'deki verilere ulaştık.
	const itemsLeft = items.filter((items) => !items.completed).length; //Tamamlanmamış ögelerin sayısına eriştik.

	const activeFilter = useSelector((state) => state.todos.activeFilter);	//activeFilter'ı state'den alma

	useEffect(() => {
		localStorage.setItem('activeFilter', activeFilter) //son seçili fitreyi uylar //Daha sonra slice'da initialState tanımında da değişiklik yaptık
	},[activeFilter])
	
	

  return (
    
    <footer className="footer">
		<span className="todo-count">
			<strong>{itemsLeft}</strong> {" "} 
			item{itemsLeft > 1 && 's'} left
		</span>


		<ul className="filters">
			<li>
				<a href="#/" className={activeFilter === 'all' ? 'selected' : ' '} 
				onClick={() => dispacth(changeActiveFilter('all'))}>All</a>
			</li>
			<li>
				<a href="#/" className={activeFilter === 'active' ? 'selected' : ' '}
				onClick={() => dispacth(changeActiveFilter('active'))}
				>Active</a>
			</li>
			<li>
				<a href="#/" className={activeFilter === 'completed' ? 'selected' : ' '}
				onClick={() => dispacth(changeActiveFilter('completed'))}>Completed</a>
			</li>
		</ul>

		<button className="clear-completed" onClick={() => dispacth(clearCompleted())}>
			Clear completed
		</button>
	</footer>

  )
}

export default ContentFooter

//initial state'de activefiltre tanımlandı ve state'e alındı. todoslice.js
//className={activeFilter === 'completed' ? 'selected' : ' '} ile seçilen butonlar tanımlandı contentfooter.
//artk bunları aktifleştşrmek için action tanılamalıyız.Completred'e tanımlandıysa state'de activeFliter güncellenmeli bu işlemi yapacağız. changeActiveFilter action'ına bakmalısın todoslice.js
//Buttonlara bastığmızda filter'nin state'i değişir hale geldi onClick={() => dispacth(changeActiveFilter('completed'))}
//Artık listeleme işlemlerini yapmamız için todolist'e gitmeliyiz.
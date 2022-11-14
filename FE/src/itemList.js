import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faPen, faRedo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
function Itemlist() {

	const [items, setItems] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [show, setShow] = useState(false);
	const [editItem, setEditItem] = useState(0);
	const [refresh, setRefresh] = useState(false);
	const [editFlag, setEditFlag] = useState(false);
	const inputRef = useRef();
	const prevState = useRef('');
    const navigate = useNavigate();

	useEffect(()=> {
		fetch('/todo/tasks/').then(res => {
			if(res.ok){
				return res.json()
			}
		}).then(jsonResponse => setItems(jsonResponse))
},[refresh]);

	const addItem = () => {
		fetch('/todo/add', {
			method: 'POST',
			body: JSON.stringify({

				text: inputRef.current.value,

			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			}
		})
		const newItem = {
			itemName: inputValue
		};
		const newItems = [...items, newItem];
		setItems(newItems);
		setInputValue('');
		setRefresh(!refresh);
	};

	//Deleting item from the list
	const deleteItem = (removeThisItem) => {
		fetch('/todo/' + removeThisItem.id, {method: 'DELETE'} )
		prevState.current = items
		setItems(items.filter((item) => item.id !== removeThisItem.id));
		setShow(true);
	};

	//Editing the item, puts the value into the input field 
	const edit = async (editThisItem, id) => {
		setEditItem(editThisItem.id);
		setEditFlag(true);
		inputRef.current.value = await editThisItem.text;
		inputRef.current.focus();
	}

	//Redo for every delete operation
	const redo = (prevState) => {
		setItems(prevState.current);
		setShow(false);
	}

	const editPush = () => {
        fetch('/todo/' + editItem, {
			method: 'PUT',
			body: JSON.stringify({

				text: inputRef.current.value,

			}),
			headers: {

				'Content-type': 'application/json; charset=UTF-8',
			}
		})
	setEditFlag(false);
	inputRef.current.value = '';
	setRefresh(!refresh);
    }
    const logout = () => {
        localStorage.removeItem('loginStatus')
        navigate('/')
    }

	
	return (<div className='main-background'>
		<div className='main-container'>
            <div className='heading'>
            <h1>Fruit list 🍑</h1>
            <button className='logout' onClick={logout}>Logout</button>
            </div>
			<div className='add-item-container'>
				<input ref={inputRef} value={inputValue} onChange={event => setInputValue(event.target.value)} className='add-item-input' placeholder='Add an item...' />
				{!editFlag&&<FontAwesomeIcon onClick={() => addItem()} icon={faPlus} />}
				{editFlag&&<FontAwesomeIcon onClick={() => editPush()} icon={faPen} />}
			</div>
			<div className='item-list-container'>
				{items.map((item, index) => <div key={item.id} className='item-container'>
					<div className='item-name'>
						<>
							<span className=''>{index + 1}. </span>
							<span className=''>{item.text}</span>
						</>
					</div>

					{!editFlag&&<div className='delete'>
						<button>
							<FontAwesomeIcon onClick={() => deleteItem(item)} icon={faTrash} />
						</button>|
						<button>
							<FontAwesomeIcon  onClick={() => edit(item, item.id)} icon={faPen} />
						</button>
					</div>}
				</div>)}

			</div>
			<div className='total-items'>
				{show && <FontAwesomeIcon className='redo-show' onClick={() => redo(prevState)} icon={faRedo} />}
				Total: {items.length}
			</div>
		</div>
	</div>);
}
export default Itemlist;
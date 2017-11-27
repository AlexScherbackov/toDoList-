import {createElement, eventEmitter} from './helpers.js';

class View extends eventEmitter{
	constructor(){
			super()
			this.form = document.getElementById('todo-form');
			this.input = document.getElementById('add-input');
			this.list = document.getElementById('todo-list');

			this.form.addEventListener('submit', this.handleAdd.bind(this));
	}

	 show(todos) {
      todos.forEach(todo => {
          const listItem = this.createElement(todo);
          this.list.appendChild(listItem);
      });
    }

	addItem(todo){
		const listItem = this.createElement(todo);
		this.input.value = '';
		this.list.appendChild(listItem);
	}

	toggleItem(todo){
		const listItem = this.findListItem(todo.id);
		const checkbox = listItem.querySelector('.checkbox');
		
		checkbox.checked = todo.completed;

		if(todo.complited){
			listItem.classList.add('complited');
		} else{
			listItem.classList.remove('complited');
		}
	}

	findListItem(id){
		return	this.list.querySelector(`[data-id ="${id}"]`);
	}

	editItem(todo){
		const listItem = this.findListItem(todo.id);
		const label = listItem.querySelector('.title');
		const input = listItem.querySelector('.textfield');
		const editBtn = listItem.querySelector('button.edit'); 

		label.textContent = todo.title;
		editBtn.textContent = 'Изменить';
		listItem.classList.remove('editing');
	}

	removeItem(id){
		const listItem = this.findListItem(id);
		this.list.removeChild(listItem);
	}

	createElement(todo){
		const checkbox = createElement(
			'input',
			{type : 'checkbox', className : 'checkbox', checked : todo.complited ? 'checked' : ''}
		);

		const label = createElement(
			'label',
			{className : 'title'}, 
			todo.title
		);

		const editInput = createElement(
			'input', 
			{type : 'text', className : 'textfield'}
		);

		const editBtn = createElement(
			'button', 
			{className : 'edit'},
			'Изменить'
		);
		const deleteBtn = createElement(
			'button', 
			{className : 'remove'},
			'Удалить'
		);

		 const item = createElement(
		 	'li', 
		 	{ className: `todo-item${todo.completed ? ' completed': ''}`, 'data-id' : todo.id}, 
		 	checkbox, label, editInput, editBtn, deleteBtn);
		 //item.setAttribute('data-id', todo.id);
		 
		return this.addEventListener(item);
	}

	addEventListener(item){
		const checkbox = item.querySelector('.checkbox');
		const editBtn = item.querySelector('button.edit');
		const deleteBtn = item.querySelector('button.remove');

		checkbox.addEventListener('change', this.handleToogle.bind(this));
		editBtn.addEventListener('click', this.handleEdit.bind(this));
		deleteBtn.addEventListener('click', this.handleRemove.bind(this));
		return item;
	}

	handleToogle(e){
		const listItem =  e.target.parentNode;
		const id = listItem.getAttribute('data-id');
		const completed =  e.target.checked;
		
		//update Model
			this.emmit('toggle', {id, completed});
	}

	handleEdit(e){
		const listItem =  e.target.parentNode;
		const id = listItem.getAttribute('data-id');
		const label = listItem.querySelector('.title');
		const input = listItem.querySelector('.textfield');
		const editBtn = listItem.querySelector('button.edit'); 
		const title = input.value;
		const isEditing = listItem.classList.contains('editing');
	
		if(isEditing){
			//update Model
			this.emmit('edit', {id, title});
		} else{
			input.value = label.textContent;
			editBtn.textContent = 'Сохранить';
			listItem.classList.add('editing');
		}
	}

	handleRemove(e){
		const listItem =  e.target.parentNode;
		const id = listItem.getAttribute('data-id');

		//remove item from model
		this.emmit('remove', id);
	}

	handleAdd(e){
		e.preventDefault();

		if(this.input.value == '') return alert('Заполните поле ввода!');

		const value = this.input.value;

		//add item to model
		this.emmit('add', value);
	}

}

export default View;
class Controller{
	constructor(model, view){
		this.model = model;
		this.view = view;

		view.on('add', this.addTodo.bind(this));
		view.on('toggle', this.toggleTodo.bind(this));
		view.on('edit', this.editTodo.bind(this));
		view.on('remove', this.removeTodo.bind(this));

		view.show(model._state);
	}

	addTodo(title){
		const todoItem = this.model.addItem({
			id: Date.now(),
			title: title,
			completed: false
		});
		
		this.view.addItem(todoItem);
	}

	toggleTodo({id, completed}){
		
		const todo = this.model.updateItem(id, {completed});

		this.view.toggleItem(todo);
	}

	editTodo({id, title}){
		const todo = this.model.updateItem(id, {title});
		this.view.editItem(todo);
	}

	removeTodo(id){
		this.model.removeItem(id);
		this.view.removeItem(id);
	}
}

export default Controller;
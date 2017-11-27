import {eventEmitter} from './helpers.js';

class Model extends eventEmitter{
	
	constructor(state=[]){
		super();
		this._state = state;
	}

	getItem(id){
		return this._state.find(item => item.id ==id);
	}

	addItem(item){
		this._state.push(item);
		this.emmit('change', this._state);
		return item;
	}

	updateItem(id, data){
		const item = this.getItem(id);
		Object.keys(data).forEach(prop => item[prop] = data[prop]);
		this.emmit('change', this._state);
		return item;
	}

	removeItem(id){
		const index = this._state.findIndex(item => item.id == id );

		if(index > -1){
			this._state.splice(index, 1);
			this.emmit('change', this._state);
		}
	}
}

export default Model;
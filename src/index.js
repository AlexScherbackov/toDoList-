import Model from  './model.js';
import View from './view.js';
import Controller from './controller.js';
import {save, load} from './helpers.js';


const state = load();

const model = new Model(state || undefined);
model.on('change', state=>save(state));

const view = new View();
const control = new Controller(model, view);
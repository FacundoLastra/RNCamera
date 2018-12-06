import { createStore, applyMiddleware } from 'redux';
 
import AppReducer from './reducers/index'; //Import the reducer
 
export default createStore(AppReducer);

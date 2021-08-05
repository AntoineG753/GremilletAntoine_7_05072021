import { createStore, combineReducers, applyMiddleware } from 'redux';
import connectedReducer from './Redux';
import thunk from 'redux-thunk';







const rootReducer = combineReducers({
    connectedReducer,
});


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

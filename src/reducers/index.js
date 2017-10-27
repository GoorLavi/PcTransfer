import contextReducer from './contextReducer';
import filesReducer from './filesReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    contextReducer,
    filesReducer
});

export default rootReducer;
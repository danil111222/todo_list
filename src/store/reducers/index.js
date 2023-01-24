import { combineReducers } from 'redux';

import taskListReducer from './taskList';
// import usersReducer from './users';

export default combineReducers({
    taskList: taskListReducer,
    // users: usersReducer
});
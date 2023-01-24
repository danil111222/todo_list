import { createReducer } from 'redux-create-reducer';
import {
    ADD_TASK,
    REMOVE_TASK,
    LOAD_INITIAL_TASK,
    APPROVE_TASK,
    REMOVE_COMPLETED_TASK,
    UPDATE_TASK,
    SELECT_TASK_ID
} from '../../constants/taskList';

const initialState = {
    tasks: [
        {id: 1, title: 'TaskName 1', body: ['TaskDescription1', "TaskDescription2"]},
        {id: 2, title: 'TaskName 2', body: ['TaskDescription']},
        {id: 3, title: 'TaskName 3', body: ['TaskDescription']},
    ],
    completedTasks: [
        {id: 4, title: 'TaskName 1', body: ['TaskDescription']},
        {id: 5, title: 'TaskName 2', body: ['TaskDescription1', "TaskDescription2"]},
        {id: 6, title: 'TaskName 3', body: ['TaskDescription']},
    ],
    updatedTaskId: '',
};

const taskListReducer = createReducer(initialState, {
    [ADD_TASK]: (state, action) => {
        const newTasks = [...state.tasks, action.payload];
        const data = {
            tasks: newTasks,
            completedTasks: state.completedTasks,
        };
        window.localStorage.setItem('todo_list', JSON.stringify(data))
        return ({
            ...state,
            tasks: [...state.tasks, action.payload]
        })
    },
    [REMOVE_TASK]: (state, action) => {
        const newTasks = state.tasks.filter((task) => task.id !== action.payload);
        const data = {
            tasks: newTasks,
            completedTasks: state.completedTasks,
        };
        window.localStorage.setItem('todo_list', JSON.stringify(data))
        return ({
            ...state,
            tasks: newTasks
        })
    },
    [LOAD_INITIAL_TASK]: (state, action) => ({
        ...state,
        tasks: action.payload.tasks || [],
        completedTasks: action.payload.completedTasks || [],
    }),
    [APPROVE_TASK]: (state, action) => {
        const newTasks = state.tasks.filter((task) => task.id !== action.payload);
        const newCompletedTasks = [...state.completedTasks, state.tasks.find((task) => task.id === action.payload)];
        console.log('newCompletedTasks', newCompletedTasks);
        const data = {
            tasks: newTasks,
            completedTasks: newCompletedTasks,
        };
        window.localStorage.setItem('todo_list', JSON.stringify(data))
        return({
            ...state,
            tasks: newTasks,
            completedTasks: newCompletedTasks,
        })
    },

    [REMOVE_COMPLETED_TASK]: (state, action) => {
        const newCompletedTasks = state.completedTasks.filter((completedTask) => completedTask.id !== action.payload);
        const data = {
            tasks: state.tasks,
            completedTasks: newCompletedTasks,
        };
        window.localStorage.setItem('todo_list', JSON.stringify(data))
        return ({
            ...state,
            completedTasks: newCompletedTasks,
        })
    },

    [UPDATE_TASK]: (state, action) => {
        const newTasks = state.tasks.map(task => {
            if (task.id === action.payload.id) {
                return action.payload;
            } else { return task; }
        } )
        const data = {
            tasks: newTasks,
            completedTasks: state.completedTasks,
        };
        window.localStorage.setItem('todo_list', JSON.stringify(data))
        return ({
            ...state,
            tasks: newTasks
        })
    },

    [SELECT_TASK_ID]: (state, action) => ({
        ...state,
        updatedTaskId: action.payload,
    }),
});

export default taskListReducer;
import { ADD_TASK, APPROVE_TASK, REMOVE_COMPLETED_TASK, REMOVE_TASK, UPDATE_TASK, LOAD_INITIAL_TASK, SELECT_TASK_ID } from '../../constants/taskList';

export const addTask = data => ({
    type: ADD_TASK,
    payload: {
        title: data.title,
        id: data.id,
        body: data.body,
        endDate: data.endDate,
    }
});

export const removeTask = id => ({
    type: REMOVE_TASK,
    payload: id
});

export const loadInitialTask = data => ({
    type: LOAD_INITIAL_TASK,
    payload: data
});

export const approveTask = id => ({
    type: APPROVE_TASK,
    payload: id
});

export const removeCompletedTask = id => ({
    type: REMOVE_COMPLETED_TASK,
    payload: id
});

export const selectTaskId = id => ({
    type: SELECT_TASK_ID,
    payload: id,
})

export const updateTask = data => ({
    type: UPDATE_TASK,
    payload: {
        id: data.id,
        title: data.title,
        body: data.body,
        endDate: data.endDate,
    }
})
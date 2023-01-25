import React, {useEffect, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from "react-redux";
import { removeTask, approveTask, updateTask, selectTaskId } from "../../store/actions/taskList";
import { format, differenceInCalendarDays } from 'date-fns'
import MyInput from "../UI/input/MyInput";
import MyModal from "../Modal/MyModal";
import MyButton from "../UI/button/MyButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";




const Task = ({ number, postLeftCol }) => {
    const tasks = useSelector(state => state.taskList.tasks);
    const updatedTaskId = useSelector(state => state.taskList.updatedTaskId);
    const updatedTask = tasks?.find((task) => task.id === updatedTaskId);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [inputTitle, setInputTitle] = useState( updatedTask?.title || '');
    const [body, setBody] = useState(updatedTask?.body || ['']);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (modal && postLeftCol.id === updatedTaskId && inputTitle !== updatedTask.title && body !== updatedTask.body) {
            setInputTitle(updatedTask.title);
            setBody(updatedTask.body);
        }
    }, [modal])

    const handleRemove = () => {
        dispatch(removeTask(postLeftCol.id));
    }

    const handleApprove = () => {
        dispatch(approveTask(postLeftCol.id));
    }

    const handleUpdateTask = () => {
        dispatch(selectTaskId(postLeftCol.id));
        setModal(true);
    }

    const addNewTask = (e) => {
        e.preventDefault()
        const newTask = {
            title: inputTitle,
            body,
            id: updatedTaskId,
            endDate: selectedDate
        }

        dispatch(updateTask(newTask));
        dispatch(selectTaskId(''));
        setInputTitle('')
        setBody([''])
        setSelectedDate(null)
        setModal(false)
    }

    const handleChangeTaskBody = (e, index) => {
        const newBody = [...body];
        newBody[index] = e.target.value;
        setBody(newBody);
    };

    const handleAddNewTaskBodyField = () => {
        setBody([...body, '']);
    }

    const handleRemoveTaskBodyField = (currentIndex) => () => {
        setBody(body.filter((el, index) => index !== currentIndex));
    }

    const handleChangeDate = (value) => {
        setSelectedDate(value);
    }

    const timeFinished = differenceInCalendarDays(new Date(postLeftCol.endDate), new Date()) > 0;

    const EndDateField = () => {
        if (!postLeftCol.endDate) return null;
        return <div className={timeFinished ? '' : 'timeEnd'}>{format(new Date(postLeftCol.endDate), 'dd.MM.yyyy')}</div>
    }

    const className = timeFinished || !postLeftCol.endDate ? 'postLeftColumn' : 'postLeftColumn timeFinished';

    return (
        <div className={className}>
            <div className="postLeftColumn__content">
                <strong>{number} {postLeftCol.title}</strong>
                <ul>
                    {postLeftCol.body?.length && postLeftCol.body.map((el, index) => (
                        <li className="list" key={index}>{el}</li>
                    ))}
                </ul>
            </div>
            <div className="postLeftColumn__btns">
                <EndDateField />
                <IconButton onClick={handleRemove} color="secondary" aria-label="add an alarm">
                    <DeleteIcon color="error">Delete task</DeleteIcon>
                </IconButton>

                <IconButton onClick={handleUpdateTask} color="secondary" aria-label="add an alarm">
                    <UpdateIcon color="secondary">Update task</UpdateIcon>
                </IconButton>

                <IconButton onClick={handleApprove} color="secondary" aria-label="add an alarm">
                    <CheckIcon color='success'>Complete task</CheckIcon>
                </IconButton>

                <MyModal visible={modal && (postLeftCol.id === updatedTaskId)} setVisible={setModal}>
                    <form className="form">
                        <div className="form__body">
                            <MyInput
                                value={inputTitle}
                                onChange={e => setInputTitle(e.target.value)}
                                type="text"
                                placeholder='Update Task title'
                            />

                            {body?.map((el, index) => (
                                <div key={index}>
                                    <MyInput
                                        value={el}
                                        onChange={(e) => handleChangeTaskBody(e,index)}
                                        type="text"
                                        placeholder="Task description"
                                    />
                                    <IconButton onClick={handleRemoveTaskBodyField(index)} color="secondary" aria-label="add an alarm">
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ))}

                            <IconButton onClick={handleAddNewTaskBodyField} color="secondary" aria-label="add an alarm">
                                <AddIcon></AddIcon>
                            </IconButton>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Update Deadline"
                                    inputFormat="MM/DD/YYYY"
                                    value={selectedDate}
                                    onChange={handleChangeDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <MyButton type="submit" onClick={addNewTask}>Update Task</MyButton>
                    </form>
                </MyModal>
            </div>
        </div>
    );
};

export default Task;
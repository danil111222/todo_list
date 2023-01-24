import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import {useDispatch} from "react-redux";
import {removeCompletedTask} from "../../store/actions/taskList";

const CompletedTask = ({ number, postRightCol, id }) => {

    const dispatch = useDispatch();

    const handleRemoveCompletedTask = () => {
        dispatch(removeCompletedTask(postRightCol.id))
    }

    return (
        <div className="postRightColumn">
            <div className="postRightColumn__content">
                <strong>{number} {postRightCol.title}</strong>
                <ul>
                    {postRightCol.body?.length && postRightCol.body.map((el, index) => (
                        <li className="list" key={index}>{el}</li>
                    ))}
                </ul>
            </div>
            <div className="postRightColumn__btns">
                <IconButton onClick={handleRemoveCompletedTask} color="secondary" aria-label="add an alarm">
                    <DeleteIcon color="error">Delete task</DeleteIcon>
                </IconButton>
            </div>
        </div>
    );
};

export default CompletedTask;
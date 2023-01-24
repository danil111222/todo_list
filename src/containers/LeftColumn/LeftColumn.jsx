import React from 'react';
import Task from "../../components/Task";

const LeftColumn = ({leftTasks, titleLeft}) => {
    return (
        <div>
            <h1 style={{textAlign: "center"}}>
                {titleLeft}
            </h1>
            {leftTasks.map((postLeftCol, index) =>
                <Task number={index + 1} postLeftCol={postLeftCol} key={index}/>
            )}
        </div>
    );
};

export default LeftColumn;
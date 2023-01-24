import React from 'react';
import CompletedTask from "../../components/CompletedTask/CompletedTask";

const RightColumn = ({rightTasks, titleRight}) => {
    return (
        <div>
            <h1 style={{textAlign: "center"}}>
                {titleRight}
            </h1>
            {rightTasks.map((postRightCol, index) =>
                <CompletedTask postRightCol={postRightCol} number={index + 1} key={index}/>
            )}
        </div>
    );
};

export default RightColumn;
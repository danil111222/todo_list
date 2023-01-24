import React from 'react';
import {Button} from "@mui/material";

const MyButton = ({children, ...props}) => {
    return (
        <Button {...props}>
            {children}
        </Button>
    );
};

export default MyButton;
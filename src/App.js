import React, {useEffect, useRef} from "react";
import './styles/App.css';
import {useState} from "react";
import LeftColumn from "./containers/LeftColumn/LeftColumn";
import RightColumn from "./containers/RightColumn/RightColumn";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import MyModal from "./components/Modal/MyModal";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, TextField } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { addTask, loadInitialTask } from "./store/actions/taskList";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
    const leftTasks = useSelector((state) => state.taskList.tasks);
    const rightTasks = useSelector((state) => state.taskList.completedTasks);
    const dispatch = useDispatch();


    useEffect(() => {
        const initialData = window.localStorage.getItem('todo_list');
        if (initialData) {
            dispatch(loadInitialTask(JSON.parse(initialData)));
        }
    }, [])

    const [modal, setModal] = useState(false)
    const [inputTitle, setInputTitle] = useState( '')
    const [body, setBody] = useState([''])
    const [selectedDate, setSelectedDate] = useState(null);

    const addNewTask = (e) => {
      e.preventDefault()
      const newTask = {
          id: Date.now(),
          title: inputTitle,
          body: body.filter(el => !!el),
          endDate: selectedDate
      }

        dispatch(addTask(newTask));
        setInputTitle('')
        setBody([''])
        setSelectedDate(null)
        setModal(false)
    }

    const handleChangeBody = (e, index) => {
        const newBody = [...body];
        newBody[index] = e.target.value;
        setBody(newBody);
    };

    const handleAddNewBodyField = () => {
        setBody([...body, '']);
    }

    const handleRemoveBodyField = (currentIndex) => () => {
        setBody(body.filter((el, index) => index !== currentIndex));
    }

    const handleChangeDate = (value) => {
        setSelectedDate(value);
    }

  return (
    <div className="App">

        <MyButton onClick={() => setModal(true)} style={{marginTop: '20px'}}>
            CREATE TASK
        </MyButton>

        <MyModal visible={modal} setVisible={setModal}>
            <form className="form">
                <div className="form__body">
                    <MyInput
                        value={inputTitle}
                        onChange={e => setInputTitle(e.target.value)}
                        type="text"
                        placeholder='Task title'
                    />

                    {body?.map((el, index) => (
                        <div key={index}>
                            <MyInput
                                value={el}
                                onChange={(e) => handleChangeBody(e,index)}
                                type="text"
                                placeholder="Task description"
                            />
                            <IconButton onClick={handleRemoveBodyField(index)} color="secondary" aria-label="add an alarm">
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    ))}

                    <IconButton onClick={handleAddNewBodyField} color="secondary" aria-label="add an alarm">
                        <AddIcon>Add new label</AddIcon>
                    </IconButton>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Set Deadline"
                            inputFormat="MM/DD/YYYY"
                            value={selectedDate}
                            onChange={handleChangeDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <MyButton type="submit" onClick={addNewTask}>Create Task</MyButton>
            </form>
        </MyModal>

        <div className="mainContainer">
            <LeftColumn leftTasks={leftTasks} titleLeft="TASK LIST"/>
            <RightColumn rightTasks={rightTasks} titleRight="COMPLETED TASK LIST"/>
        </div>
    </div>
  );
}

export default App;

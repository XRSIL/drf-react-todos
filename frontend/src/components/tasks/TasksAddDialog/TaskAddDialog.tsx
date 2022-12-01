import Dialog from "@mui/material/Dialog";
import { TaskAddProps } from "./types";
import { styles } from "./styles";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { Task } from "../TasksList/types";
import { callApi } from "../../common/utils/api";
import { apiUrls } from "../apiUrls";

export const TaskAddDialog = ({ setDialogOpened, loadTasks }: TaskAddProps) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [errorAlertOpened, setErrorAlertOpened] = useState<boolean>(false);

    const handleAddTask = () => {
        const requestData = { title, description };
        callApi(apiUrls.tasksAdd, 'post', requestData)
            .then((task: Task) => {
                if (task) {
                    loadTasks();
                    setDialogOpened(false);
                } else {
                    setErrorAlertOpened(true);
                }
            })
    };


    return (
        <Dialog
            style={ styles.dialogWindow }
            open={ true }
        >
            <div style={ styles.dialogContent }>
                <h4>Добавить задачу</h4>
                <div className='d-flex flex-column mt-4' style={ styles.textField }>
                    <TextField
                        label='Название задачи'
                        variant='outlined'
                        size='small'
                        value={ title }
                        onChange={ (e) => setTitle(e.target.value) }
                    />
                </div>
                <div className='d-flex flex-column mt-4'>
                    <TextField
                        multiline
                        label='Описание задачи (необязательно)'
                        variant='outlined'
                        size='small'
                        style={ styles.textField }
                        value={ description }
                        onChange={ (e) => setDescription(e.target.value) }
                    />
                </div>
                <div className='d-flex justify-content-end mt-3'>
                    <Button
                        className='ms-2'
                        variant={ 'outlined' }
                        onClick={ () => setDialogOpened(false) }
                    >
                        Закрыть
                    </Button>
                    <Button className='ms-2' variant={ 'contained' } onClick={ () => handleAddTask()}>
                        Добавить
                    </Button>
                </div>
            </div>
            <Snackbar
                anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
                open={ errorAlertOpened }
                autoHideDuration={ 3000 }
                onClose={ () => setErrorAlertOpened(false) }
            >
                <Alert onClose={ () => setErrorAlertOpened(false) } severity="error" sx={{ width: '100%' }}>
                    При загрузке задач возникла ошибка
                </Alert>
            </Snackbar>

        </Dialog>
    )
}
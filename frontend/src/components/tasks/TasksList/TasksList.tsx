import React, { useEffect, useState } from 'react';
import { Task } from "./types";
import { apiUrls } from "../apiUrls";
import { styles } from "./styles";
import { callApi } from "../../common/utils/api";
import { TaskAddDialog } from "../TasksAddDialog/TaskAddDialog";
import { Button, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


export const TasksList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [tasksError, setTasksError] = useState<string | null>(null);
    const [openedDialog, setOpenedDialog] = useState<boolean>(false);

    const defaultTasksError = 'При загрузке задач возникла ошибка';

    const fetchTasksList = () => {
        callApi(apiUrls.tasksList)
            .then((tasks: Task[]) => {
                if (tasks) {
                    setTasks(tasks);
                } else {
                    setTasksError(defaultTasksError);
                    setTasks([]);
                }
            })
            .catch(() => setTasksError(defaultTasksError));
    };

    const handleIsDoneCheckbox = (task: Task) => {
        const updatedTask = { ...task, is_done: !task.is_done };
        callApi(apiUrls.tasksDetail(task.id), 'put', updatedTask)
            .then((task: Task) => {
                if (task) {
                    fetchTasksList();
                } else {
                    setTasksError(defaultTasksError);
                    setTasks([]);
                }
            })
            .catch(() => setTasksError(defaultTasksError));
    };

    const handleTaskDelete = (taskId: number) => {
        callApi(apiUrls.tasksDetail(taskId), 'delete')
            .then(() => {
                fetchTasksList();
            })
            .catch((e) => setTasksError(defaultTasksError));
    };


    useEffect(() => {
        fetchTasksList();
    }, []);

    return (
        <>
            <div className='w-100 d-flex justify-content-end'>
                <Button variant='outlined' onClick={ () => setOpenedDialog(true) }>
                    Добавить задачу
                </Button>
            </div>
            <div className='d-flex mt-3'>
                <div className='fw-bold' style={ styles.isDoneColumn }>Выполнена ли</div>
                <div className='fw-bold' style={ styles.titleColumn }>Название</div>
                <div className='fw-bold' style={ styles.descriptionColumn }>Описание</div>
                <div className='fw-bold' style={ styles.createdAtColumn }>Дата создания</div>
                <div className='fw-bold' style={ styles.doneAtColumn }>Дата выполнения</div>
            </div>
            { tasks.length > 0 ? (
                <>
                    {
                        tasks.map((task) => (
                            <div key={ task.id } className='d-flex mt-3'>
                                <div style={ styles.isDoneColumn }>
                                    <Checkbox
                                        checked={ task.is_done }
                                        onChange={ () => handleIsDoneCheckbox(task) }
                                    />
                                </div>
                                <div style={ styles.titleColumn }>{ task.title }</div>
                                <div className='text-break' style={ styles.descriptionColumn }>
                                    { task.description || 'Нет описания' }
                                </div>
                                <div style={ styles.createdAtColumn }>{ task.created_at}</div>
                                <div style={ styles.doneAtColumn }>{ task.done_at || '-' }</div>
                                <div style={ styles.deleteTaskColumn }>
                                    <IconButton
                                        children={ <DeleteIcon /> }
                                        onClick={ () => handleTaskDelete(task.id) }
                                    />
                                </div>
                            </div>
                        ))}
                </>
            ) : (tasksError ? (
                <div className='mt-5'>{ tasksError }</div>
            ) : (
                <div className='mt-5'>Пока нет задач, попробуй их добавить нажав на кнопку в правом верхнем углу</div>
            ))
            }
            { openedDialog && <TaskAddDialog setDialogOpened={ setOpenedDialog } loadTasks={ fetchTasksList } /> }
        </>
    );
};
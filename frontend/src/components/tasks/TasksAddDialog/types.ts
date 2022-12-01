export interface TaskAddProps {
    setDialogOpened: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    loadTasks: () => void
}

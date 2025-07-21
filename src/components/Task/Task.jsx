import { useContext, useEffect, useRef, useState } from "react";
import css from "./Task.module.css";
import Checkbox from "@mui/material/Checkbox";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Fade,
  IconButton,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { NotifyContext } from "../../App";

export default function Task({ task, changeTask, deleteTask }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDone, setIsDone] = useState(task.done);
  const [taskTitle, setTaskTitle] = useState(task.title ?? "");
  const [taskDescription, setTaskDescription] = useState(
    task.description ?? ""
  );
  const [isShowDialog, setIsShowDialog] = useState(false);

  const inputTitleRef = useRef(null);

  const notifyContext = useContext(NotifyContext);

  useEffect(() => {
    if (isEdit) inputTitleRef?.current?.focus();
  }, [isEdit]);

  const onChangeDoneStatus = () => {
    setIsDone(!isDone);
    changeTask(task.id, {
      done: !isDone,
    });
    notifyContext.showNotification({
      text: !isDone
        ? `Задача ${task.title} выполнена!`
        : `Задача ${task.title} активна`,
      time: 2000,
      type: !isDone ? "success" : "info",
    });
  };

  const acceptChanges = () => {
    if (taskTitle !== task.title || taskDescription !== task.description) {
      changeTask(task.id, {
        title: taskTitle,
        description: taskDescription,
      });
      notifyContext.showNotification({
        text: `Задача ${task.title} обновлена`,
        time: 3000,
        type: "success",
      });
    }
    setIsEdit(false);
  };

  const declineChanges = () => {
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setIsEdit(false);
  };

  const modalAccept = () => {
    deleteTask(task.id);
    notifyContext.showNotification({
      text: `Задача ${task.title} удалена`,
      time: 1500,
      type: "success",
    });
    setIsShowDialog(false);
  };

  const onModalDecline = () => {
    setIsShowDialog(false);
  };

  return (
    <Fade in>
      <div className={`${css.task}`}>
        <div className={css.taskCheck}>
          <Checkbox
            checked={isDone}
            onChange={() => onChangeDoneStatus()}
            sx={{
              color: isDone ? "#D8D8D8" : "#539CFD",
              "&.Mui-checked": { color: isDone ? "D8D8D8" : "#539CFD" },
            }}
          />
        </div>
        <div className={css.taskInfo}>
          {isEdit ? (
            <>
              <div className={css.taskInfoTitleInput}>
                <TextField
                  inputRef={inputTitleRef}
                  label="Название "
                  defaultValue={taskTitle}
                  onChange={(e) => {
                    setTaskTitle(e.target.value);
                  }}
                />
              </div>
              <div className={css.taskInfoDescriptionInput}>
                {" "}
                <TextField
                  label="Описание "
                  defaultValue={taskDescription}
                  onChange={(e) => {
                    setTaskDescription(e.target.value);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <h2 className={css.taskInfoTitle}>{task.title}</h2>
              <p className={css.taskInfoDescription}> {task.description}</p>
            </>
          )}
        </div>
        <div className={css.taskActions}>
          {isEdit ? (
            <>
              <IconButton onClick={() => acceptChanges()}>
                <CheckIcon
                  sx={{
                    color: isDone ? "#D8D8D8" : "#539CFD",
                  }}
                />
              </IconButton>
              <IconButton onClick={() => declineChanges()}>
                <CloseIcon
                  sx={{
                    color: isDone ? "#D8D8D8" : "#539CFD",
                  }}
                />
              </IconButton>
            </>
          ) : (
            <Checkbox
              checked={isEdit}
              onChange={() => setIsEdit(!isEdit)}
              icon={
                <EditIcon
                  className={css[isDone ? "iconIsDone" : "iconIsNotDone"]}
                />
              }
            />
          )}
          <IconButton onClick={() => setIsShowDialog(true)}>
            <DeleteOutlineIcon
              sx={{
                color: isDone ? "#D8D8D8" : "#539CFD",
              }}
            />
          </IconButton>
          <Dialog
            open={isShowDialog}
            aria-labelledy="alert-dialog-title"
            maxWidth="md"
          >
            <DialogTitle>{"Удалить задачу"}</DialogTitle>
            <DialogActions>
              <Button onClick={() => modalAccept()}>Удалить</Button>
              <Button onClick={() => onModalDecline()}>Отменить</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </Fade>
  );
}

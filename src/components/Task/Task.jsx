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
    <div className={css.task}>
      <div className={css.taskCheck}>
        <Checkbox
          checked={isDone}
          onChange={() => onChangeDoneStatus()}
          sx={{
            color: isDone ? "#757575" : "#fff", 
            "&.Mui-checked": {
              color: isDone ? "#757575" : "#42A5F5",
            },
          }}
        />
      </div>

      <div className={css.taskInfo}>
        {isEdit ? (
          <>
            <div className={css.taskInfoTitleInput}>
              <TextField
                inputRef={inputTitleRef}
                label="Название"
                variant="outlined"
                size="small"
                defaultValue={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                sx={{
                  "& label": { color: "#bbb" },
                  "& label.Mui-focused": { color: "#90caf9" },
                  "& .MuiOutlinedInput-root": {
                    color: "#eee",
                    backgroundColor: "#222",
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#90caf9" },
                    "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                  },
                }}
              />
            </div>

            <div className={css.taskInfoDescriptionInput}>
              <TextField
                label="Описание"
                variant="outlined"
                size="small"
                defaultValue={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                sx={{
                  "& label": { color: "#bbb" },
                  "& label.Mui-focused": { color: "#90caf9" },
                  "& .MuiOutlinedInput-root": {
                    color: "#eee",
                    backgroundColor: "#222",
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#90caf9" },
                    "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                  },
                }}
                multiline
                rows={2}
              />
            </div>
          </>
        ) : (
          <>
            <h2 className={css.taskInfoTitle} style={{ color: isDone ? "#757575" : "#e0e0e0" }}>
              {task.title}
            </h2>
            <p className={css.taskInfoDescription} style={{ color: isDone ? "#616161" : "#ccc" }}>
              {task.description}
            </p>
          </>
        )}
      </div>

      <div className={css.taskActions}>
        {isEdit ? (
          <>
            <IconButton onClick={() => acceptChanges()} sx={{ color: "#fff" }}>
              <CheckIcon />
            </IconButton>
            <IconButton onClick={() => declineChanges()} sx={{ color: "#ef5350" }}>
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <Checkbox
            checked={isEdit}
            onChange={() => setIsEdit(!isEdit)}
            icon={<EditIcon className={css[isDone ? "iconIsDone" : "iconIsNotDone"]} />}
            sx={{
              color: isDone ? "#757575" : "#64B5F6",
              "&.Mui-checked": { color: "#90caf9" },
            }}
          />
        )}

        <IconButton onClick={() => setIsShowDialog(true)} sx={{ color: "#ef5350" }}>
          <DeleteOutlineIcon />
        </IconButton>

        <Dialog open={isShowDialog} aria-labelledby="alert-dialog-title" maxWidth="md">
          <DialogTitle id="alert-dialog-title" sx={{ color: "#eee", backgroundColor: "#333" }}>
            Удалить задачу
          </DialogTitle>
          <DialogActions sx={{ backgroundColor: "#222" }}>
            <Button onClick={() => modalAccept()} sx={{ color: "#ef5350" }}>
              Удалить
            </Button>
            <Button onClick={() => onModalDecline()} sx={{ color: "#90caf9" }}>
              Отменить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  </Fade>
);
}

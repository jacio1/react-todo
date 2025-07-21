import { Button, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import css from "./AddForm.module.css";
import { useEffect, useState, useContext } from "react";
import { NotifyContext } from "../../App";

export default function AddForm({ closeModal, addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const notifyContext = useContext(NotifyContext);

  useEffect(() => {
    setIsTitleValid(title.trim() !== "");
    setIsDescriptionValid(description.trim() !== "");
  }, [title, description]);

  const addNewTask = (event) => {
    event.preventDefault();
    if (!isTitleValid || !isDescriptionValid) return;

    addTask({ title, description });

    notifyContext.showNotification({
      text: "Задача добавлена!",
      time: 2000,
      type: "success",
    });

    closeModal();
  };

  return (
    <form className={css.addTaskForm} onSubmit={addNewTask}>
      <IconButton className={css.closeButton} onClick={closeModal} size="small">
        <CloseIcon sx={{ color: "#fff" }} />
      </IconButton>
      <h2 className={css.title}>Новая задача</h2>
      <div className={css.formTitle}>
        <TextField
          fullWidth
          helperText={!isTitleValid && "Заполните это поле!"}
          error={!isTitleValid}
          value={title}
          label="Название"
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            "& label": { color: "#fff" },
            "& label.Mui-focused": { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#fff" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
          }}
        />
      </div>
      <div className={css.formDescription}>
        <TextField
          fullWidth
          helperText={!isDescriptionValid && "Заполните это поле!"}
          error={!isDescriptionValid}
          value={description}
          label="Описание"
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            "& label": { color: "#fff" },
            "& label.Mui-focused": { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#fff" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
          }}
        />
      </div>
      <Button
        type="submit"
        variant="outlined"
        sx={{
          color: "#fff",
          borderColor: "#fff",
          mt: 2,
          "&:hover": {
            borderColor: "#fff",
            backgroundColor: "#333",
          },
        }}
      >
        Добавить
      </Button>
    </form>
  );
}

import { Button, TextField } from "@mui/material";
import css from "./AddForm.module.css";
import { useEffect, useState, useContext } from "react";
import { NotifyContext } from "../../App";

export default function AddForm({ closeModal, addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(title && title.trim());
  const [isDescriptionValid, setIsDescriptionValid] = useState(
    description && description.trim()
  );

  const notifyContext = useContext(NotifyContext);

  useEffect(() => {
    setIsTitleValid(title && title.trim());
    setIsDescriptionValid(description && description.trim());
  }, [title, description]);

  const addNewTask = (event) => {
    event.preventDefault();
    if (!isTitleValid || !isDescriptionValid) return;

    addTask({
      title,
      description,
    });

    notifyContext.showNotification({
      text: "Задача добавлена!",
      time: 2000,
      type: "success",
    });

    closeModal();
  };

  return (
    <>
      <form className={css.addTaskForm} onSubmit={(event) => addNewTask(event)}>
        <h2>Новая задача</h2>
        <div className={css.formTitle}>
          <TextField
            helperText={!isTitleValid && "Заполните это поле!"}
            error={!isTitleValid}
            value={title}
            label="Название"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={css.formDescription}>
          <TextField
            helperText={!isDescriptionValid && "Заполните это поле!"}
            error={!isDescriptionValid}
            value={description}
            label="Описание"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button type="submit" variant="outlined">
          Добавить
        </Button>
      </form>
    </>
  );
}

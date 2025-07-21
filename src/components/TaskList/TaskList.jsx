import { useEffect, useState } from "react";
import Task from "../Task/Task";
import css from "./taskList.module.css";

export default function TaskList({
  tasks,
  title,
  sortBy,
  changeTask,
  deleteTask,
}) {
  const [sortTasks, setSortTasks] = useState([]);

  useEffect(() => {
    setSortTasks(
      [...tasks].filter((task) => (sortBy ? task[sortBy] : !task.done))
    );
  }, [tasks, sortBy]);

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>{title}</h2>
      <div className={css.list}>
        {sortTasks.length
          ? sortTasks.map((task) => {
              return (
                <Task
                  task={task}
                  key={`${task.title}-${task.done}-${task.id}`}
                  changeTask={changeTask}
                  deleteTask={deleteTask}
                />
              );
            })
          : "Список задач пуст"}
      </div>
    </div>
  );
}

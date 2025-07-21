import { useState, createContext } from "react";
import "./App.css";
import TaskList from "./components/TaskList/TaskList";
import AddBtn from "./components/AddBtn/AddBtn";
import AddForm from "./components/AddForm/AddForm";
import Search from "./components/Search/Search";
import useSearchTasks from "./hooks/useSearchTasks";
import { addTask, updateTask, deleteTask } from "./helpers";
import Notifications from "./components/Notifications/Notifications";
import useNotification from "./hooks/useNotification";

// eslint-disable-next-line react-refresh/only-export-components
export const NotifyContext = createContext(null);

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "Task 1 description",
      done: false,
    },
    {
      id: 2,
      title: "Task 2",
      description: "Task 2 description",
      done: false,
    },
    {
      id: 3,
      title: "Task 3",
      description: "Task 3 description",
      done: false,
    },
    {
      id: 4,
      title: "Task 4",
      description: "Task 4 description",
      done: false,
    },
  ]);

  const [searchGlobal, setSearchGlobal] = useState("");

  const searchTasks = useSearchTasks(tasks, searchGlobal);

  const { notifications, showNotification, removeNotificationById } =
    useNotification();
  const onAddTask = addTask(tasks, setTasks);

  const onUpdateTask = updateTask(tasks, setTasks);

  const onDeleteTask = deleteTask(tasks, setTasks);

  return (
    <NotifyContext.Provider
      value={{ notifications, showNotification, removeNotificationById }}
    >
      <Notifications notifications={notifications} />
      <Search setSearchGlobal={setSearchGlobal} />
      <div className="wrapper">
        <TaskList
          title="Активные"
          tasks={searchTasks}
          changeTask={onUpdateTask}
          deleteTask={onDeleteTask}
        />
        <TaskList
          title="Завершенные"
          tasks={searchTasks}
          sortBy="done"
          changeTask={onUpdateTask}
          deleteTask={onDeleteTask}
        />
      </div>
      <AddBtn>
        {(closeModal) => {
          return <AddForm closeModal={closeModal} addTask={onAddTask} />;
        }}
      </AddBtn>
    </NotifyContext.Provider>
  );
}

export default App;

export const deleteTask = (tasks, setTasks) => {
  return (id) => {
    setTasks([...tasks].filter((task) => task.id !== id));
  };
};

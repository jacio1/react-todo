export const updateTask = (tasks, setTasks) => {
  return (id, data) => {
    setTasks(
      [...tasks].map((task) => (task.id === id ? { ...task, ...data } : task))
    );
  };
};

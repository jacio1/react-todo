export const addTask = (tasks, setTasks) => {
  return (data) => {
    setTasks([
      ...tasks,
      {
        id: tasks.at(-1)?.id + 1 || 1,
        ...data,
      },
    ]);
  };
};

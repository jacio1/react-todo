import { useMemo } from "react";

export default function useSearchTasks(tasks, search) {
  return useMemo(() => {
    if (search) {
      const lowerSearch = search.toLowerCase();

      return [...tasks].filter((task) => {
        return (
          task.title.toLowerCase().includes(lowerSearch) ||
          task.description.toLowerCase().includes(lowerSearch)
        );
      });
    }

    return tasks;
  }, [tasks, search]);
}

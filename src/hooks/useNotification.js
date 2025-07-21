import { useEffect, useState } from "react";

export default function useNotification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const firstNoti = notifications[0];

    if (firstNoti) {
      const timer = setTimeout(() => {
        removeNotificationById(firstNoti.id);
      }, firstNoti?.time ?? 1000);

      return () => clearTimeout(timer);
    }
  });

  const removeNotificationById = (id) => {
    setNotifications([...notifications].filter((noti) => noti.id !== id));
  };

  const showNotification = (newNoti) => {
    setNotifications([
      ...notifications,
      {
        id: notifications.at(-1)?.id + 1 || 1,
        ...newNoti,
      },
    ]);
  };

  return {
    notifications,
    showNotification,
    removeNotificationById,
  };
}

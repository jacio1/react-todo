import Notification from "../Notification/Notification";
import css from "./Notifications.module.css";

export default function Notifications({ notifications }) {
  return (
    <div className={css.wrapper}>
      {notifications &&
        notifications.map((noti) => {
          return <Notification key={`Noti-${noti.id}`} noti={noti} />;
        })}
    </div>
  );
}

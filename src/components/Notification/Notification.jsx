import Alert from "@mui/material/Alert";
import css from "./Notification.module.css";

export default function Notification({ noti }) {
  return (
    <div className={css.noti}>
      <Alert severity={noti.type}>{noti?.text ?? "Noti"}</Alert>
    </div>
  );
}

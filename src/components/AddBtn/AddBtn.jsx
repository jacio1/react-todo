import { Dialog } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import css from "./AddBtn.module.css";
import { useState } from "react";

export default function AddBtn({ children }) {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <Dialog open={isModal} onClose={() => setIsModal(false)}>
        {children(() => setIsModal(false))}
      </Dialog>
      <div onClick={() => setIsModal(true)} className={css.addBtn}>
        <AddIcon sx={{ width: 30, color: "white" }} />
      </div>
    </>
  );
}

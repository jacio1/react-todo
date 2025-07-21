import { IconButton, TextField } from "@mui/material";
import css from "./Search.module.css";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function Search({ setSearchGlobal }) {
  const [searchText, setSearchText] = useState("");
  const [isClear, setIsClear] = useState(false);

  useEffect(() => {
    if (searchText) {
      setSearchGlobal(searchText);
      setIsClear(true);
      return;
    }

    setIsClear(false);
    setSearchGlobal("");
  }, [searchText, setSearchGlobal]);

  const onClearClick = () => {
    setSearchGlobal("");
    setIsClear(false);
    setSearchText("");
  };

  return (
    <div className={css.wrapper}>
      <TextField
        label="Поиск"
        variant="outlined"
        fullWidth
        value={searchText}
        onInput={(e) => setSearchText(e.target.value)}
      />
      {isClear && (
        <IconButton onClick={() => onClearClick()} className={css.clear}>
          <CloseIcon />
        </IconButton>
      )}
    </div>
  );
}

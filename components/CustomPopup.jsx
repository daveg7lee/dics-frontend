import React, { useState } from "react";
import Popover from "@material-ui/core/Popover";

const CustomPopup = ({ contents }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <button
        aria-describedby={id}
        onClick={handleClick}
        className="blueButton"
      >
        Detail
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {contents}
      </Popover>
    </div>
  );
};

export default CustomPopup;

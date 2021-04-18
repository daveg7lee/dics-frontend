import React from 'react';
import Popover from '@material-ui/core/Popover';

const CustomPopup = ({ contents }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
        className="blueButton"
      >
        Show List
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {contents}
      </Popover>
    </div>
  );
};

export default CustomPopup;

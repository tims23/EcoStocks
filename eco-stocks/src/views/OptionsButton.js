import React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import { MoreVert } from '@mui/icons-material';

const OptionsButton = ({editAction = () => {}, deleteAction = () => {}}) => {
    const ITEM_HEIGHT = 48;
    const OPTIONS = [
        ['Edit', editAction],
        ['Delete', deleteAction],
    ];
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }   

    const handleClose = (clickAction = () => {}) => {
        clickAction();
        setAnchorEl(null);
    }

    return (
        // Your JSX code goes here
        <div>
             <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert></MoreVert>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {OPTIONS.map((option) => (
          <MenuItem key={option[0]} selected={option === 'Pyxis'} onClick={() => handleClose(option[1])}>
            {option[0]}
          </MenuItem>
        ))}
      </Menu>
        </div>
    );
};

export default OptionsButton;
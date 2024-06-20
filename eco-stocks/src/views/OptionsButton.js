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

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
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
        {OPTIONS.map(([optionName, optionAction]) => (
          <MenuItem key={optionName} selected={optionName === 'Pyxis'} onClick={() => {
            handleClose()
            optionAction()
          }}>
            {optionName}
          </MenuItem>
        ))}
      </Menu>
        </div>
    );
};

export default OptionsButton;
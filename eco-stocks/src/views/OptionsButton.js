import React from 'react';
import { useState } from 'react';
import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';

/** 
  * 
  * This code defines a Material-UI button component that opens a menu with options to edit or delete an item.
  * 
  * @param {*} editAction: function to execute when edit option is clicked
  * @param {*} deleteAction: function to execute when delete option is clicked
  * 
  */
const OptionsButton = ({editAction = () => {}, deleteAction = () => {}}) => {
    // Constants
    const ITEM_HEIGHT = 48;
    // Options for the menu
    const OPTIONS = [
        ['Edit', editAction],
        ['Delete', deleteAction],
    ];
    // state for the click anchor
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // handle click event and set anchor element
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }   

    // close the menu by setting anchor element to null
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
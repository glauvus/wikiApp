import React, { useState } from 'react';
import './Header.css';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { openMenu } from './features/wikiSlice';

function Header() {

  // updates the state of the menu via the openMenu reducer function
  const dispatch = useDispatch();
  const openCloseMenu = () => {
      dispatch(openMenu());
  };

  return (
    <div className="header">
        <div className="header-menu">
            <IconButton onClick={openCloseMenu}>
                <MenuIcon />
            </IconButton>
            <h1>MyPosts</h1>
        </div>
        <div className="header-search">
            <SearchIcon />
            <input placeholder="Search post" type="text" />
        </div>
    </div>
  );
}

export default Header;
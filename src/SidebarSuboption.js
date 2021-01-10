import React from 'react';
import './SidebarSuboption.css'
import LabelIcon from '@material-ui/icons/Label';
import { useDispatch } from 'react-redux';
import { setWikilist } from './features/wikiSlice';

function SidebarSuboption({ category, subcategory }) {

  /* updates the state of the wikilist via the setWikilist reducer function
    while also changing the class of the selected suboption */
  const dispatch = useDispatch();
  const selectSuboption = (evt) => {
    document.querySelectorAll(".sidebarOption-suboption").forEach(suboption => suboption.classList.remove("sidebarOption-suboption--selected"));
    evt.target.closest(".sidebarOption-suboption").classList.add("sidebarOption-suboption--selected");
    dispatch(setWikilist({category, subcategory,}));
  }


  return (
    <div className="sidebarOption-suboption" onClick={selectSuboption}>
        <LabelIcon />
        <p>{subcategory}</p>
    </div>
  );
}

export default SidebarSuboption;
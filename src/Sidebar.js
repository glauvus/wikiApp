import React,  {useState, useEffect } from 'react';
import './Sidebar.css';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SidebarOption from './SidebarOption.js';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useHistory } from 'react-router-dom';
import { db } from './firebase';
import { useSelector } from 'react-redux';
import { openCloseMenu } from './features/wikiSlice';

function Sidebar() {

  const history = useHistory();
  const openWikiedit = () => history.push("/wikiedit");
  const [categories, setCategories] = useState([]);
  const isMenuOpen = useSelector(openCloseMenu);

  // every time the component is loaded, update the info via querying for the categories
  useEffect(() => {
    db.collection('categories')
      .onSnapshot(snapshot =>
        setCategories(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className={`sidebar ${isMenuOpen && "sidebar--colapsed"}`}>
        <Button startIcon={<AddIcon fontSize="large" />} className="sidebar-add-wiki" onClick={openWikiedit}>
            NEW POST
        </Button>

        {categories.map(({ id, data: { category
      }}) => (
        <SidebarOption
          Icon={ChevronRightIcon} 
          id={id}
          key={id}
          category={category}
        />
      ))}
    </div>
  );
}

export default Sidebar;
import React, { useState, useEffect } from 'react';
import './SidebarOption.css';
import SidebarSuboption from './SidebarSuboption';
import { db } from './firebase';

function SidebarOption({ Icon, category }) {

  const [selected, setSelected] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const selectOption = () => selected ? setSelected(false) : setSelected(true);

  /* every time the component is loaded, update the info via querying for the subcategories
    of the selected category */
  useEffect(() => {
    db.collection('subcategories').where("category", "==", category)
      .onSnapshot(snapshot => 
        setSubcategories(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className={`sidebarOption ${selected && "sidebarOption--selected"}`}>
        <div className="sidebarOption-option" onClick={selectOption}>
          <Icon className="optionIcon" />
          <h4>{category}</h4>
        </div>
        {subcategories.map(({ id, data: { category, subcategory
        }}) => (
          <SidebarSuboption
            key={id}
            category={category}
            subcategory={subcategory}
          />
))}
    </div>
  );
}

export default SidebarOption;
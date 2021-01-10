import React from 'react';
import './WikilistRow.css'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectWiki } from './features/wikiSlice';

function WikilistRow({ id, category, subcategory, title, description, time }) {

    const history = useHistory();

    // updates the state of the selected wiki via the selectWiki reducer function
    const dispatch = useDispatch();
    const openWiki = () => {
        dispatch(selectWiki({
            id, title, description, time,
        }));
        history.push("/wikipost");
    };

  return (
    <div className="wikilistRow" onClick={openWiki}>
        <h4 className="wikilistRow-category">
            {category} ({subcategory})
        </h4>
        <h4 className="wikilistRow-title">
            {title}
        </h4>
        <div className="wikilistRow-time">
            {time}
        </div>
    </div>
  );
}

export default WikilistRow;
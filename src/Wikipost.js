import React from 'react';
import './Wikipost.css'
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector } from 'react-redux';
import { selectOpenWiki } from './features/wikiSlice';
import { useHistory } from 'react-router-dom';
import { db } from './firebase';
import ReactMarkdown from 'react-markdown';

function Wikipost() {

  const history = useHistory();
  const navigateBack = () => history.push("/");

  // get the selected wiki from the corresponding state and delete it
  const selectedWiki = useSelector(selectOpenWiki);
  const deleteWiki = () => {
    db.collection('wikis').doc(selectedWiki.id).delete()
    .then(navigateBack);
  }

  return (
    <div className="wikipost">
        <div className="wikipost-tools">
          <IconButton title="Back" onClick={navigateBack}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton title="Delete post" onClick={deleteWiki}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div className="wikipost-main">
          <div className="wikipost-title">
            <h1>{selectedWiki?.title}</h1>
            <h4>{selectedWiki?.time}</h4>
          </div>
          <div className="wikipost-body">
            <ReactMarkdown>{selectedWiki?.description}</ReactMarkdown>
          </div>
        </div>
    </div>
  );
}

export default Wikipost;
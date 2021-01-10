import React, { useState } from 'react';
import './Wikiedit.css'
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useForm } from 'react-hook-form';
import { db } from './firebase';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';

function Wikiedit() {

  const { register, handleSubmit, watch, errors } = useForm();
  const history = useHistory();

  /* submits the form at the wikis collection,
    then adds the category in the categories collection if it does not already exists,
    then adds the subcategory in the subcategories collection if it does not already exists */
  const onSubmit = formData => {
      console.log(formData);
      db.collection('wikis').add({
        category: formData.category,
        subcategory: formData.subcategory,
        title: formData.title,
        description: formData.description,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(
        db.collection('categories').where("category", "==", formData.category).get().then(function(querySnapshot) {
          if(querySnapshot.empty) db.collection('categories').add({
            category: formData.category,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
      })
      )
      .then(
        db.collection('subcategories').where("category", "==", formData.category).where("subcategory", "==", formData.subcategory).get().then(function(querySnapshot) {
          if(querySnapshot.empty) db.collection('subcategories').add({
            category: formData.category,
            subcategory: formData.subcategory,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
      })
      )
      .then(clearInputs);
  }

  //clicks the invisible submit button of the form
  const handleClick = () => {
      document.getElementById("submit-button").click();
  }

  const navigateBack = () => history.push("/");

  const clearInputs = () => document.getElementById("wikiForm").reset();

  return (
    <div className="wikiedit">
        <div className="wikiedit-tools">
          <IconButton title="Back" onClick={navigateBack}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton title="Clear form fields" onClick={clearInputs}>
            <DeleteIcon />
          </IconButton>
          <IconButton title="Add post" onClick={handleClick}>
            <PostAddIcon />
          </IconButton>
        </div>
        <div className="wikiedit-main">
          <form id="wikiForm" onSubmit={handleSubmit(onSubmit)}>
            <input name="category" type="text" placeholder="Category" ref={register({required: true})}/>
            {errors.category && <p className="wikiedit-main-error">Category is required!</p>}

            <input name="subcategory" type="text" placeholder="Subcategory" ref={register({required: true})}/>
            {errors.subcategory && <p className="wikiedit-main-error">Subcategory is required!</p>}

            <input name="title" type="text" placeholder="Title" ref={register({required: true})}/>
            {errors.title && <p className="wikiedit-main-error">Title is required!</p>}

            <input type="submit" id="submit-button" className="wikiedit-submit"/>
          </form>
          <textarea name="description" placeholder="Description (markdown format)" form="wikiForm" ref={register({required: true})}/>
          {errors.description && <p className="wikiedit-main-error">Description is required!</p>}
        </div>
    </div>
  );
}

export default Wikiedit;
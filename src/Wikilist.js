import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import './Wikilist.css'
import WikilistRow from './WikilistRow';
import { wikiList } from './features/wikiSlice';
import { useSelector } from 'react-redux';

function Wikilist() {

  const [wikis, setWikis] = useState([]);
  const wikilist = useSelector(wikiList);

  /* every time the wikis state is updated, update the info via querying for the wikilist,
    if empty, show all wikis,
    if not, show the corresponding wikis of the selected category and subcategory */
  useEffect(() => {
    if(wikilist == null) {
        db.collection('wikis')
          .orderBy('timestamp', 'desc')
          .onSnapshot(snapshot => 
            setWikis(
              snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
              }))
            )
          );
    }
    else
    db.collection('wikis').where("category", "==", wikilist.category).where("subcategory", "==", wikilist.subcategory)
    .onSnapshot(snapshot =>
      setWikis(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, [wikis]); 

  return (
    <div className="wikilist">
      {wikis.map(({ id, data: { category, subcategory, title, description, timestamp 
      }}) => (
        <WikilistRow 
          id={id}
          key={id}
          category={category}
          subcategory={subcategory}
          title={title}
          description={description}
          time={new Date(timestamp?.seconds*1000).toDateString()}
        />
      ))}
    </div>
  );
}

export default Wikilist;
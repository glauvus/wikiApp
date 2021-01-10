import { configureStore } from '@reduxjs/toolkit';
import wikiReducer from '../features/wikiSlice';

export default configureStore({
  reducer: {
    wiki: wikiReducer,
  },
});

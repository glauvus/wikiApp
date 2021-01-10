import { createSlice } from '@reduxjs/toolkit';

export const wikiSlice = createSlice({
  name: 'wiki',
  initialState: {
    selectedWiki: null,
    isMenuOpen: false,
    wikilist: null,
  },
  reducers: {
    selectWiki: (state, action) => {
      state.selectedWiki = action.payload;
    },
    openMenu: (state) => {
      state.isMenuOpen ? state.isMenuOpen=false : state.isMenuOpen=true;
    },
    setWikilist: (state, action) => {
      state.wikilist = action.payload;
    },
  },
});

export const { selectWiki, openMenu, setWikilist } = wikiSlice.actions;

export const selectOpenWiki = state => state.wiki.selectedWiki;
export const openCloseMenu = state => state.wiki.isMenuOpen;
export const wikiList = state => state.wiki.wikilist;

export default wikiSlice.reducer;

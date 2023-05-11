import { configureStore, createSlice } from '@reduxjs/toolkit';
import { idbMiddleware } from './../idb/idbMiddleware';

const initialState = {
  notes: [],
  searchTerm: '',
  selectedNoteId: 0,
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
      state.selectedNoteId = action.payload.id;
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
      console.log(state.notes);
      state.selectedNoteId = 0;
    },
    updateNote: (state, action) => {
      const { id, text } = action.payload;
      const noteIndex = state.notes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        state.notes[noteIndex].text = text;
      }
    },
    renameNote: (state, action) => {
      const { id, title } = action.payload;
      const noteIndex = state.notes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        state.notes[noteIndex].title = title;
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    selectNote: (state, action) => {
      state.selectedNoteId = action.payload;
    },
  },
});

export const { addNote, deleteNote, updateNote, setSearchTerm, selectNote, renameNote } =
  notesSlice.actions;


  export const store = configureStore({
    reducer: {
      notes: notesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(idbMiddleware),
  });

  store.dispatch({ type: 'notes/loadNotes' });

  export const setNotes = (notes) => {
    return {
      type: 'notes/setNotes',
      payload: notes,
    };
  };

  export const loadNotes = () => {
    return {
      type: 'notes/loadNotes',
    };
  };
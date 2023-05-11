import { configureStore, createSlice } from '@reduxjs/toolkit';

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
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    selectNote: (state, action) => {
      state.selectedNoteId = action.payload;
    },
  },
});

export const { addNote, deleteNote, updateNote, setSearchTerm, selectNote } =
  notesSlice.actions;


  export const store = configureStore({
    reducer: {
      notes: notesSlice.reducer,
    },
  });
import { openDB } from 'idb';

const notesMiddleware = storeAPI => next => action => {
  if (action.type === 'notes/saveNote') {
    const { id, title, content } = action.payload;
    openDB('notesDB', 1, {
      upgrade(db) {
        db.createObjectStore('notes');
      },
    })
      .then(db => {
        const tx = db.transaction('notes', 'readwrite');
        tx.objectStore('notes').put({ id, title, content });
        return tx.complete;
      })
      .then(() => {
        console.log('Note saved to IndexedDB');
      })
      .catch(error => {
        console.log('Error saving note to IndexedDB:', error);
      });
  }

  if (action.type === 'notes/loadNotes') {
    openDB('notesDB', 1)
      .then(db => {
        const tx = db.transaction('notes', 'readonly');
        return tx.objectStore('notes').getAll();
      })
      .then(notes => {
        storeAPI.dispatch({ type: 'notes/notesLoaded', payload: notes });
      })
      .catch(error => {
        console.log('Error loading notes from IndexedDB:', error);
      });
  }

  return next(action);
};

export default notesMiddleware;

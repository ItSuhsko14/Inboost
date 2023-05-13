import { openDB } from 'idb';
import { setNotes } from './../redux/noteSlice';

const dbPromise = openDB('notes', 1, {
  upgrade(db) {
    db.createObjectStore('notes', { keyPath: 'id' });
  },
});

export const idbMiddleware = (store) => (next) => async (action) => {
  const { dispatch } = store;
  
  if (action.type === 'notes/setNotes') {
    const db = await dbPromise;
    const tx = db.transaction('notes', 'readwrite');
    const store = tx.objectStore('notes');
    await store.clear();
    action.payload.forEach((note) => {
      store.add(note);
    });
    await tx.complete;
  }

  const result = next(action);

  if (action.type === 'notes/loadNotes') {
    const db = await dbPromise;
    const tx = db.transaction('notes', 'readonly');
    const objectStore = tx.objectStore('notes');
    const notes = await objectStore.getAll();
    dispatch(setNotes(notes));
  }

  return result;
};

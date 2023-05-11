import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import { loadNotesMiddleware, saveNotesMiddleware } from './../idb/idbMiddleware';





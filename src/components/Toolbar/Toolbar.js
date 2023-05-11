import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
    addNote,
    deleteNote,
    editNote,
    selectNote,
    searchNotes
} from './../../redux/noteSlice.js';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import './style.css';

function Toolbar() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const notes = useSelector(state => state.notes.notes);
    console.log();

    const handleAddNote = () => {
        dispatch(addNote({
          id: uuidv4(),
          title: 'New Note',
          text: 'Some text',
        }));
    }

    const handleEdit = () => {
        console.log('ClickEdit')
    }

    const selectedId = useSelector(state => state.notes.selectedNoteId);
    

    const removeNote = (e) => {
        
        const id = selectedId.id;    
        dispatch(deleteNote({id}))
    }

    return (
        <div className='toolbar'>
            <div className='tools' >
                <button onClick={handleAddNote}><AddIcon /></button>
                <button onClick={handleEdit}><EditIcon /></button>
                <button onClick={ (e) => removeNote(e)}><DeleteIcon /></button>
            </div>    
            <input type="text" placeholder="Пошук" />
        </div>
    )
}

export default Toolbar;
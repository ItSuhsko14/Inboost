import React, {useEffect} from 'react';
import './style.css';
import {useDispatch, useSelector} from 'react-redux';
import {selectNote} from './../../redux/noteSlice';

function Sidebar() {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);
    console.log(notes);
    const selectedId = useSelector(state => state.notes.selectedNoteId);

    const handleSelect = (curId) => {
        dispatch(selectNote({
          id: curId
        }));
    }

    return (
        <div className='sidebar'>
            <ul>
                {
                    notes.map( (note) => {
                        let isSelected = false;
                        if (selectedId) {
                            isSelected = selectedId.id === note.id;
                        }
                        
                        return (
                            <li
                                    onClick={() => handleSelect(note.id)} 
                                    id={isSelected ? 'selected' : ''}> 
                                        {note.title} 
                               
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Sidebar;
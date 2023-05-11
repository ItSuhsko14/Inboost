import React, {useEffect} from 'react';
import './style.css';
import {useDispatch, useSelector} from 'react-redux';
import {selectNote, store} from './../../redux/noteSlice';
import {loadNotes, setNotes} from './../../redux/noteSlice';

function Sidebar() {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);
    console.log(notes);
    const selectedId = useSelector(state => state.notes.selectedNoteId);

    const handleSelect = (curId) => {
        dispatch(selectNote({ id: curId }));
    }

    useEffect(() => {
        // Завантаження збережених нотаток з IndexedDB
        dispatch(loadNotes());
    
        // Якщо необхідно, збереження нових нотаток в IndexedDB
        const unsubscribe = store.subscribe(() => {
          const notes = store.getState().notes.notes;
          dispatch(setNotes(notes));
        });
    
        return unsubscribe;
      }, [dispatch]);
    

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
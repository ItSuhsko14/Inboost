import React, {useState, useEffect} from 'react';
import TextBlock from './TextBlock';
import './style.css';
import {useDispatch, useSelector} from 'react-redux';
import {updateNote} from './../../redux/noteSlice'

const MainBlock = (props) => {

  const dispatch = useDispatch();

  const notes = useSelector(state => state.notes.notes);
  const selectedId = useSelector(state => state.notes.selectedNoteId);
  const curText = notes.find( (note) => {
    if (selectedId) {
      return note.id === selectedId.id
    }
  });
  
  

  const [text, setText] = useState('');

  useEffect( () => {
    if (curText) {
      console.log(curText.text);
      setText(curText.text);
    }
  }, [selectedId])
    

  const handleChange = (event) => {
    setText(event.target.value);
    let id = selectedId.id;
    dispatch(updateNote({id, text}))
  };

  return (
    <div className='main-block'>
      <TextBlock text={text} onChange={handleChange}/>
    </div>
  )
}

export default MainBlock;
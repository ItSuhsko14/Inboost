import React from 'react'
import './style.css'
function Toolbar() {
    return (
        <div className='toolbar'>
            <button>+</button>
            <button>редагувати</button>
            <button>видалити</button>
            <input type="text" placeholder="Пошук" />
        </div>
    )
}

export default Toolbar;
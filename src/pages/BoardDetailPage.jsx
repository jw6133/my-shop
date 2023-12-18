import React from 'react'
import { useLocation } from 'react-router-dom'

function BoardDetailPage() {
    const state = useLocation().state;
    const {id, user, date, title, text} = state;
    return (
        <div className='container'>
            <div className='boardTextBox'>
                <strong>{title}</strong>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default BoardDetailPage

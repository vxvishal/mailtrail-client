import React from 'react'
import './styles.css';

export default function TrackingList(props) {
    return (
        <div className='list-item'>
            <p className='item-title'>{props.title}</p>
            <div className='item-time'>{props.createdAt}</div>
        </div>
    )
}

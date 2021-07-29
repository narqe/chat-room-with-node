import React from 'react'
import Message from '../message/Message'
import './Messages.css'
import STB from 'react-scroll-to-bottom'

const Messages = ({messages, userId}) => {
    return (
        <STB
            className="chat-container">
            {messages.map((m, i) => 
            <Message 
                key={m._id}
                message={m} 
                currentUuid={userId} 
            />)}
        </STB>
    )
}

export default Messages

import React from 'react'
import './Input.css'

export const Input = ({message, setMessage, sendMessage}) => {
    return (
        <form action="" className="form" onSubmit={sendMessage}>
            <input 
                className="input"
                placeholder="Type a message"
                type='text'
                onChange={event => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                value={message}
            />
            <button className='sendButton btn'>Send</button>
        </form>
    )
}

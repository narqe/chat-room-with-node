import React from 'react'
import './Message.css'

const Message = ({message: {name, userId, text}, currentUuid}) => {
    let isCurrentId = false;
    if(userId === currentUuid) {
        isCurrentId = true; 
    }

    return (
        isCurrentId ? (
            <div className="row right-align">
                <div className="col s12 m8 16 right">
                    <p className="sentbyme">{`${name}: ${text}`}</p>
                </div>
            </div>) : (
            <div className="row left-align">
                <div className="col s12 m8 16 left">
                    <p className="sentbyother">{`${name}: ${text}`}</p>
                </div>
            </div>
        )
    )
}

export default Message

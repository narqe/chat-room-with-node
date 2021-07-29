import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext'
import io from 'socket.io-client'; 
import Messages from './messages/Messages'
import { Input } from '../input/Input';
import './Chat.css'
let socket;
 
const Chat = () => {
    const ENDPOINT = 'http://localhost:5000'
    const { user } = useContext(UserContext);
    let {roomId, roomName} = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit('join', ({name: user.name, roomId, userId: user._id}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        socket.on('recive-message', message => {
            setMessages([...messages, message])
        })
    }, [messages])

    useEffect(() => {
        socket.emit('get-messages-history', roomId)
        socket.on('output-messages', messages => {
            setMessages(messages)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sendMessage = event => {
        event.preventDefault();
        if (message) {
            socket.emit('send-message', message, roomId, () => setMessage(''))
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                {'You are chatting at ' + roomName}
                <Messages messages={messages} userId={user._id} />
                <Input 
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    )
}

export default Chat

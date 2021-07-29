import React, {useContext, useState, useEffect} from 'react';
import { UserContext } from '../../UserContext';
import RoomList from './RoomList'
import io from 'socket.io-client'; 
import { Redirect } from 'react-router-dom';
import './Home.css'
let socket;

const Home = () => {
    const ENDPOINT = 'http://localhost:5000'
    const {user} = useContext(UserContext);
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState([]);

    const handleRoom = (e) => {
        setRoom(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        socket.emit('create-room', ({name: room, userCreator: user._id}))
        setRoom('')
    }
    
    useEffect(() => {
        socket = io(ENDPOINT)
        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT])

    useEffect(() => {
        socket.on('room-created', room => {
            setRooms([...rooms, room])
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rooms])


    useEffect(() => {
        socket.on('input-rooms', rooms => {
            setRooms(rooms)
        })
    }, [])

    if(!user) {
        return (<Redirect to="/login" />)
    } else {
        return (
            <>
                <div className="container row">
                    <div className="col s6 m6">
                        <div className="card blue-grey darken-1 chatCreator">
                            <div className="card-content white-text">
                                <span className="card-title">{'Welcome ' + user.name}</span>
                            </div>
                            <div className="row">
                                <form action="" className="col s12 align-center" onSubmit={handleSubmit}>
                                    <div className="input-field col s12">
                                        <input 
                                            placeholder="Enter a room name" 
                                            id="room" 
                                            type="text" 
                                            value={room}
                                            onChange={handleRoom}
                                            className="validate" />
                                        <label htmlFor="room">Room name</label>
                                    </div>
                                    <button className="btn row align-center">Create a room</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col s6 m5 offset-1 roomList">
                        {!!rooms.length ? <RoomList rooms={rooms} isActive={!!user ? true : false} /> : <h3>No existen salas creadas</h3>}
                    </div>
                </div>
            </>
        )
    }
}

export default Home

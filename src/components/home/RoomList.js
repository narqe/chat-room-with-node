import React, {useContext, useEffect} from 'react';
import { UserContext } from '../../UserContext';
import Room from './Room'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'; 
let socket;

const RoomList = ({rooms, isActive}) => {
    const ENDPOINT = 'http://localhost:5000'
    const {user} = useContext(UserContext);

    const handleRemoveRoom = (id) => {
        socket.emit('delete-room', (id))
    }

    useEffect(() => {
        socket = io(ENDPOINT)
        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT])

    return (
        <div>
            {!!rooms && rooms.map(room => (
                <div className="row" key={room._id}>
                    <Link className={`col ${room.userCreator === user._id ? 's10' : 's12'}`} key={room._id} to={!!isActive ? `/chat/${room._id}/${room.name}` : '#'} >
                        <Room name={room.name} />
                    </Link>
                    {room.userCreator === user._id && (
                        <button 
                            className="btn col s2" onClick={(ev, value) => handleRemoveRoom(room._id)}>
                            X
                        </button>
                    )}
                </div>
                )
            )}
        </div>
    )
}

export default RoomList

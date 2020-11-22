import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core';
import { DonutLarge, Chat, MoreVert, SearchOutlined } from '@material-ui/icons';
import { useStateValue } from '../context/StateProvider';
import SidebarChat from './SidebarChat';
import db from '../firebase';
import '../styles/Sidebar.css';

// React component.
function Sidebar() {
    // Save all rooms in the database in 'rooms' state.
    const [rooms, setRooms] =  useState([])

    // Get the use from the data layer.
    const [{ user }, dispatch] = useStateValue()

    // Get new rooms if one is created.
    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot =>
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        );
        return () => {
            unsubscribe();
        }
    }, [])

    // Render component.
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar

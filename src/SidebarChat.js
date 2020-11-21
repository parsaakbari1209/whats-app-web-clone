import React, { useState, useEffect } from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import db from './firebase';

// React component.
function SidebarChat({ id, name, addNewChat }) {
    // Generate random seed whenever SidebarChat loads for the first time.
    const [seed, setSeed] = useState('')
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    // Create a new room.
    const createChat = () => {
        const roomName = prompt("Please enter name for chat room: ")
        if (roomName) {
            db.collection("rooms").add({name: roomName})
        }
    }

    const [messages, setMessages] = useState([])
    useEffect(() => {
        if (id) {
            db.collection("rooms")
              .doc(id)
              .collection("messages")
              .orderBy("timestamp", "desc")
              .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => doc.data()))
            )
        }
    }, [id])
    
    // Render a create-new-room sidebarChat or a normal one.
    return addNewChat ? (
        <div className="sidebarChat createChat" onClick={createChat}>
            <h2>Create New Chat</h2>
        </div>
    ) : (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>
                        {messages[0]?.message}
                    </p>
                </div>
            </div>
        </Link>
    )
}

// Export values.
export default SidebarChat

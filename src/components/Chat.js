import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import firebase from 'firebase';
import '../styles/Chat.css';
import db from '../firebase.js';
import { useStateValue } from '../context/StateProvider';

function Chat() {

    const [{ user }, dispatch] = useStateValue()

    const { roomID } = useParams();
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    useEffect(() => {
        if (roomID) {
            db.collection("rooms").doc(roomID).onSnapshot(snapshot => (
                setRoomName(snapshot.data()?.name)
            ))
            
            db.collection("rooms")
            .doc(roomID)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) =>
                doc.data()))
            )
        }
    }, [roomID])

    const [input, setInput] = useState('')
    const sendMessage = (e) => {
        e.preventDefault()
        db.collection("rooms")
        .doc(roomID)
        .collection("messages")
        .add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('')
    }

    const [seed, setSeed] = useState('')
    useEffect(() => {
        setSeed(roomID)
    }, [roomID])
        
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h2>{roomName}</h2>
                    <p>
                        {new Date(
                            messages[messages.length-1]?.
                            timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input type="text" placeholder="Type a message"
                    onChange={e => setInput(e.target.value)}
                    value={input} />
                    <button type="submit" onClick={sendMessage}>send</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat

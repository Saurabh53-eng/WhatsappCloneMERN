import { AnalyticsSharp } from '@mui/icons-material';
import { Avatar } from '@mui/material'
import { collection, doc, documentId, getDoc, getDocs, getFirestore, orderBy, query, setDoc, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import db from './firebase';
import './SidebarChat.css'
function SidebarChat({ id, name, addNewChat }) {
  const { roomId } = useParams();

  const [seed, setseed] = useState('');
  const [messages, setmessages] = useState('')
  useEffect(() => {
    if (id) {
      const getMessage = async () => {
        const db = getFirestore();
        const msg = query(collection(db, "rooms"), where(documentId(), '==', roomId))
        const snapshot = await getDocs(msg)
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(), id: doc.id
        }))

        data.map(async (elem) => {
          const messages = query(collection(db, `rooms/${elem.id}/messages`), orderBy("timestamp", "asc"))
          const msgDetail = await getDocs(messages)
          const ans = msgDetail.docs.map(doc => doc.data())
          setmessages(msgDetail.docs.map(doc => doc.data()))
        });
      };
      getMessage();
    }
  }, [roomId,id])

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
      //do some clever database stuff..
      const q = doc(collection(db, "rooms"))
      const data = { name: roomName }
      await setDoc(q, data)
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          <p>{messages[0]?.message} </p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  )
}

export default SidebarChat
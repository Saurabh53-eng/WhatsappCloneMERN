import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material'
import MicIcon from '@mui/icons-material/Mic';
import { Avatar, IconButton } from '@mui/material'
import { addDoc, collection, doc, documentId, getDoc, getDocs, getFirestore, orderBy, query, setDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Chats.css'
import db from './firebase';
import { useStateValue } from './StateProvider';
import { serverTimestamp } from 'firebase/firestore';
function Chats() {
  const [input, setinput] = useState('')
  const [seed, setseed] = useState('')
  const { roomId } = useParams();
  const [roomName, setroomName] = useState("")
  const [messages, setmessages] = useState([])
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (roomId) {
      const q = query(collection(db, "rooms"), where(documentId(), '==', roomId))

      const getUser = async () => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setroomName(doc.data().name)
        })
      }
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
      getUser()
      getMessage()
    };
  }, [roomId])

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000))
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('you typed', input);
    const setMessage = async () => {
      const db = getFirestore();
      const msg = query(collection(db, "rooms"), where(documentId(), '==', roomId))
      const snapshot = await getDocs(msg)
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      }));
      data.map(async (elem) => {
        const messages1 = query(collection(db, `rooms/${elem.id}/messages`))
        // console.log(messages1);
        // const q = await getDocs(messages)
        const data = {
          message: input,
          name: user.displayName,
          timestamp: serverTimestamp()
        };
        console.log(data);
        await setDoc(doc(messages1), data)
      });
    };
    setMessage();
    setinput("")
  }
  return (
    <div className='chat'>
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>last seen{" "}
            {new Date(
              // eslint-disable-next-line
              messages[messages.length - 1]?.
                timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="chat_headerRight">
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
      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${message.name === user.displayName && "chat_receiver"} `}>
            <span className="chat_name">
              {message.name}
            </span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}

      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input value={input} onChange={e => setinput(e.target.value)} placeholder='Type a message' type="text" />
          <button onClick={sendMessage} type='submit'>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chats
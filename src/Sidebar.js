import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [rooms, setrooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        const q = query(collection(db, "rooms"))
        onSnapshot(q, (snapshot) =>
            setrooms(snapshot.docs.map((d) =>
            ({
                id: d.id,
                data: d.data(),
            }))
            )
        );
    }, [])

    return (
        <div className='sidebar'>
            <div className="sidebar_header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder='Search or start new chat' type="text" />
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat />
                {rooms.map((room) => {
                    return (
                        <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                    )
                })}

            </div>
        </div>
    )
}

export default Sidebar
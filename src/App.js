import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Chats from "./Chats";
import Login from "./Login";
import Sidebar from "./Sidebar";
import { useStateValue } from "./StateProvider";
function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    //BEM naming convention
    <div className="app">
      <div className="app_body">
        {!user ? (
          <Login />
        ) : (
          <BrowserRouter>
            <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId" element={<><Chats /></>} />
              <Route path="/" element={<Chats />} />
            </Routes>
          </BrowserRouter>
        )};
      </div>
    </div>
  );
}

export default App;

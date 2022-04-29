import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import Create from './components/Create';
import Players from './components/Players'
import Status from './components/Status'
import Update from './components/Update'

function App() {
  const [players, setPlayers ] = useState([]);


  const removePlayer = playerID => {
    setPlayers(players.filter(Player => Player._id != playerID));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Create players={players} setPlayers={setPlayers}/>} path='/add/player'/>
        <Route element={<Players removePlayer={removePlayer}/>} path='/'/>
        <Route element={<Status />} path='/players/status'/>
        {/* <Route element={<Update />} path=''/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

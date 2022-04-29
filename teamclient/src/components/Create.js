import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate, useParams} from "react-router-dom";
import TextField from '@mui/material/TextField';
import '../App.css';
import axios from "axios";
import {Link} from 'react-router-dom';


const Create = (props) => {
    const {players, setPlayers} = props;
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");


    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/players/addplayer`, 
        {
        name: name,
        position: position,
    })
        .then(res=>{
            console.log("PLAYERS",players,"DATA",res.data)
            setPlayers([...players, res.data.Team])
            console.log(res.data.Team)
            navigate('/')
            })
        .catch(err=>console.log(err)) 
}

    return (
        <div className='adding'>
            <h1 className='addtext'>Add Player</h1>
            <form >
            <TextField
                className='fieldone'
                required
                id="outlined-required"
                label="Required"
                placeholder='Name...'
                onChange={(e) => setName(e.target.value)}
                sx={{ my: 1 }}
            />
            {name.length < 3 && name.length > 0 ? (
                <p> Name must be greater than than 3 characters </p> ): null}


            <TextField
                className='fieldtwo'
                id="outlined-required"
                label="Optional"
                placeholder='Position...'
                onChange={(e) => setPosition(e.target.value)}
            />
            {position.length < 5 && position.length > 0 ? (
                <p> Position must be greater than than 5 characters </p> ): null}

            </form>
            <div>
                <Button onClick={submitHandler} variant="contained" className='button' sx={{ my: 1 }}>Submit</Button>
            </div>
            <div>
            <Button variant="outlined" size="small" color='primary'><Link to='/' className='direct'>Players List</Link></Button>
            </div>
        </div>
    );
}

export default Create;
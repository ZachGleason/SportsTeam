import React, {useState, useEffect} from "react";
import '../App.css';
import {Link} from 'react-router-dom';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Status = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/players/list")
        .then((res) => {
            setPlayers(res.data.Teams);
            console.log(res.data.Teams);
            })
        .catch((err) => console.log(err));
    },  []);

    const playinggreen = document.querySelector(".playinggreen");
    const playingred = document.querySelector(".playingred");
    const playingyellow = document.querySelector(".playingyellow");

    const changeColorGreen = () => {
        return (
        playinggreen.style.background = "lightgreen"
        )
    }

    const changeColorRed = () => {
        return (
        playingred.style.background = "red"
        )
    }

    const changeColorYellow = () => {
        return (
        playingyellow.style.background = "yellow"
        )
    }


    return ( 
        <div>
            <Button variant="contained" sx={{ ml: 68, mt: 5}}><Link to='/players/status' className="status" >Manage Player Status</Link></Button>
            <Button variant="contained"  sx={{ ml: 10, mt: 5 }}><Link to='/add/player' className="add">Add Player</Link></Button>
            <Button variant="contained"  sx={{ ml: 10, mt: 5 }}><Link to='/' className="list">Players List</Link></Button>
            <TableContainer component={Paper} className='stats'>
                <Table sx={{ maxWidth: 900, m: "auto", my: 5 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell><b>Player Name</b></TableCell>
                        <TableCell align="center"><b>Actions</b></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {players.map((player, index) => (
                        <TableRow
                        key={index}
                        >
                        <TableCell component="th" scope="row">
                        {player.name}
                            {/* <Link to={`/player/${id}`}>{player.name}</Link> */}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                            <Button onClick={changeColorGreen } className='playinggreen' variant="outlined" >Playing</Button>
                            <Button onClick={changeColorRed } className='playingred' variant="outlined" >Not Playing</Button>
                            <Button onClick={changeColorYellow } className='playingyellow' variant="outlined" >Undecided</Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Status;
import React, {useState, useEffect} from "react";
import '../App.css';
import  { useNavigate } from "react-router-dom";
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
import DeleteIcon from '@mui/icons-material/Delete';


const Players = (props) => {
    const [players, setPlayers] = useState([]);
    const { removePlayer } = props;
    const navigate = useNavigate();

    const reload = () => {
        document.location.reload(true)
    }

    const deletePlayer = ( playerID ) => {
        alert('player deleted')
        axios.delete('http://localhost:8000/player/delete/' + playerID)
        .then(res => {
            removePlayer(playerID);
            console.log(playerID);
            reload()
        })
        .catch((err) => console.log(err))
}
    useEffect(() => {
        axios.get("http://localhost:8000/players/list")
        .then((res) => {
            setPlayers(res.data.Teams);
            console.log(res.data.Teams);
            })
        .catch((err) => console.log(err));
    },  []);

    return (
        <div>
            <Button variant="contained" sx={{ ml: 68, mt: 5}}><Link to='/players/status' className="status" >Manage Player Status</Link></Button>
            <Button variant="contained"  sx={{ ml: 10, mt: 5 }}><Link to='/add/player' className="add">Add Player</Link></Button>
            <Button variant="contained"  sx={{ ml: 10, mt: 5 }}><Link to='/' className="list">Players List</Link></Button>
            <TableContainer component={Paper} className='tables'>
                <Table sx={{ maxWidth: 900, m: "auto", my: 5 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell><b>Player Name</b></TableCell>
                        <TableCell align="left"><b>Preferred Position</b></TableCell>
                        <TableCell align="left"><b>Actions</b></TableCell>
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
                        <TableCell component="th" scope="row">
                        {player.position}
                        </TableCell>
                        <TableCell component="th" scope="row">
                        <Button onClick={(e) => {deletePlayer(player._id)}} color="error" variant="contained" startIcon={<DeleteIcon />}    >Delete</Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Players;

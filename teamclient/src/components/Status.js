import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const Status = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:8000/players/list")
        .then((res) => {
            setPlayers(res.data.Teams);
            console.log(res.data.Teams);
        })
        .catch((err) => console.log(err));
    }, []);

    const handleStatus = (playerID, status) => {
        let newPlayer = {}
        const newPlayers = players.map((player) => {
        console.log("Player", player, playerID);
        if (player._id === playerID) {
            newPlayer = { ...player, status: status };
            return newPlayer;
        } else {
            return player;
        }
        });
        setPlayers(newPlayers);

        axios.put(`http://localhost:8000/player/update/${playerID}`, newPlayer)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    };

    return (
        <div>
        <Button variant="contained" sx={{ ml: 68, mt: 5 }}>
            <Link to="/players/status" className="status">
            Manage Player Status
            </Link>
        </Button>
        <Button variant="contained" sx={{ ml: 10, mt: 5 }}>
            <Link to="/add/player" className="add">
            Add Player
            </Link>
        </Button>
        <Button variant="contained" sx={{ ml: 10, mt: 5 }}>
            <Link to="/" className="list">
            Players List
            </Link>
        </Button>
        <TableContainer component={Paper} className="stats">
            <Table
            sx={{ maxWidth: 1000, m: "auto", my: 5 }}
            aria-label="simple table"
            >
            <TableHead>
                <TableRow>
                <TableCell>
                    <b>Player Name</b>
                </TableCell>
                <TableCell align="center">
                    <b>Actions</b>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {players.map((player, index) => (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">
                    {player.name}
                    {/* <Link to={`/player/${id}`}>{player.name}</Link> */}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                    <Button
                        onClick={() => handleStatus(player._id, "Playing")}
                        className={
                        player.status === "Playing" ? "playing" : "status-player"
                        }
                        variant="outlined"
                        sx={{ mx: 3 }}
                    >
                        Playing
                    </Button>
                    <Button
                        onClick={() => handleStatus(player._id, "Not Playing")}
                        className={
                        player.status === "Not Playing"
                            ? "not-playing"
                            : "status-player"
                        }
                        variant="outlined"
                        sx={{ mx: 3 }}
                    >
                        Not Playing
                    </Button>
                    <Button
                        onClick={() => handleStatus(player._id, "Undecided")}
                        className={
                        player.status === "Undecided"
                            ? "undecided"
                            : "status-player"
                        }
                        variant="outlined"
                        sx={{ mx: 3 }}
                    >
                        Undecided
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
    };

    export default Status;

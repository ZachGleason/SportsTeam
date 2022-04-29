const Team = require('../models/team.model');

const findAllPlayers = (req, res) => {
    Team.find()
        .then((allTeams) => {
            res.json({ Teams: allTeams })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

const findOneSinglePlayer = (req, res) => {
    Team.findOne({ _id: req.params.id })
        .then(oneSinglePlayer => {
            res.json({ Team: oneSinglePlayer })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

const createNewPlayer = (req, res) => {
    Team.create(req.body)
        .then(newlyCreatedTeam => {
            res.json({ Team: newlyCreatedTeam })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

const updatePlayer= (req, res) => {
    Team.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedTeam => {
            res.json({ Team: updatedTeam })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

const deletePlayer = (req, res) => {
    Team.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports = {
    findAllPlayers,
    findOneSinglePlayer,
    createNewPlayer,
    updatePlayer,
    deletePlayer,
}
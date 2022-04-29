const TeamController = require('../controllers/team.controller');

module.exports = (app) => {
    app.get('/players/list', TeamController.findAllPlayers);
    app.get('/player/:id', TeamController.findOneSinglePlayer);
    app.post('/players/addplayer', TeamController.createNewPlayer);     
    app.delete('/player/delete/:id', TeamController.deletePlayer)
    app.put('/player/update/:id', TeamController.updatePlayer)
}
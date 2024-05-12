// Файл routes/games.js

const gamesRouter = require('express').Router();

const {findAllGames, createGame} = require('../middlewares/games');
const {sendAllGames, sendGameCreated} = require('../controllers/games');

const {findGameById} = require('../middlewares/games');
const {sendGameById} = require('../controllers/games');

const {updateGame} = require('../middlewares/games');
const {sendGameUpdated} = require('../controllers/games');

const {deleteGame} = require('../middlewares/games');
const {sendGameDeleted} = require('../controllers/games');

const {checkIsGameExists} = require('../middlewares/games');

const {checkIfUsersAreSafe} = require('../middlewares/games');

const {checkIfCategoriesAvaliable} = require('../middlewares/categories');

const {checkEmptyFields} = require('../middlewares/games');

const {checkAuth} = require('../middlewares/auth');

const {checkIsVoteRequest} = require('../middlewares/games');
// Файл routes/games.js

gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.post("/games", findAllGames, createGame, sendGameCreated);
gamesRouter.get("/games/:id", findGameById, sendGameById);

// Файл routes/games.js

// Пока запишем порядок действий псевдокодом 
gamesRouter.post(
    "/games",
    findAllGames,
    checkIsGameExists,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
    checkAuth,
    createGame,
    sendGameCreated
  );
  
  gamesRouter.put(
    "/games/:id",
    findGameById,
    checkIsVoteRequest,
    checkIfUsersAreSafe,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
    checkAuth,
    updateGame,
    sendGameUpdated
  );

  gamesRouter.delete("/games/:id", checkAuth, findGameById, deleteGame, sendGameDeleted);

module.exports = gamesRouter;
// routes/games.js
const gamesRouter = require("express").Router(); // Создали роутер
const {
  sendAllGames,
  sendUpdatedGames

} = require("../controllers/games");
const { getAllGames, checkIsTitleInArray, updateGamesArray, updateGamesFile, findGamesById, deleteGame} = require("../middlewares/games");

gamesRouter.get("/games", getAllGames, sendAllGames);
gamesRouter.delete("/games/:id", getAllGames, findGamesById, deleteGame, updateGamesFile, sendUpdatedGames);
gamesRouter.post("/games", getAllGames, checkIsTitleInArray,updateGamesArray, updateGamesFile, sendUpdatedGames);
module.exports = gamesRouter;

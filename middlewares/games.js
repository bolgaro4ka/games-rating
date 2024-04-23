const { readData, writeData } = require("../utils/data"); // Чтение и запись данных в JSON-файл


const getAllGames = async (req, res, next) => {
    // Читаем список игр из файла
    const games = await readData("./data/games.json");
    if (!games) {
        res.status(400);
        res.send({
        status: "error",
        message: "Нет игр в базе данных. Добавьте игру.",
        });
        return;
    }
    req.games = games;
    next();
}

const checkIsTitleInArray = (req, _, next) => {
    req.isNew = !Boolean(req.games.find(item => item.title === req.body.title));
    next();
}

const updateGamesArray = async (req, res, next) => {
    if (req.isNew) {
        // https://www.icloud.com/keynote/01fnJkCVOjSabEfozpz6cSjfw объект с данными о новой игре
        const inArray = req.games.map(item => Number(item.id));
        let maximalId;
        if (inArray.length > 0) {
          maximalId = Math.max(...inArray);
        } else {
          maximalId = 0;
        }
        req.updatedObject = {
          id: maximalId + 1,
          title: req.body.title,
          image: req.body.image,
          link: req.body.link,
          description: req.body.description
        };
        // Добавляем данные о новой игре в список с другими играми
        req.games = [...req.games, req.updatedObject];
        next();
    } else {
        res.status(400);
        res.send({ status: "error", message: "Игра с таким именем уже есть." });
        return
    }}


const updateGamesFile = async (req, res, next) => {
    await writeData("./data/games.json", req.games);
    next();
}

const findGamesById = async (req, res, next) => {
    const id = Number(req.params.id);
    next();

  // Найдём игру, которую хотят удалить, в общем массиве с играми по id
  req.game = req.games.find((item) => item.id === id);
  next();
}

const deleteGame = async (req, res, next) => {
    // Найдём индекс удаляемой игры в общем массиве игр
    const id = req.games.id;
    const index = req.games.findIndex((item) => item.id === req.games.id);

    // Удалим из массива игр игру
    req.games.splice(index, 1);

  next();
}
module.exports = {
    getAllGames,
    checkIsTitleInArray,
    updateGamesArray,
    updateGamesFile,
    findGamesById,
    deleteGame
}
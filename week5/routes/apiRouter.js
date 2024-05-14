const apiRouter = require('express').Router();
const usersRouter = require("./users");
const categoriesRouter = require("./categories");
const gamesRouter = require("./games");
const authRouter = require("./auth");

apiRouter.use("/api", gamesRouter);
apiRouter.use("/api", usersRouter);
apiRouter.use("/api", categoriesRouter);
apiRouter.use("/api", authRouter); // Добавляем роутер для аутентификации

module.exports = apiRouter;

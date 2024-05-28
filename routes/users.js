  // Создаём роут для запросов категорий 
const usersRouter = require('express').Router();
  
  // Импортируем вспомогательные функции
const {findAllUsers, createUser} = require('../middlewares/users');
const {sendAllUsers, sendUserCreated} = require('../controllers/users');

const {deleteUser} = require('../middlewares/users');

const {findUserById} = require('../middlewares/users');
const {sendUserById} = require('../controllers/users');

const {updateUser} = require('../middlewares/users');
const {sendUserUpdated} = require('../controllers/users');

const {checkIsUserExists} = require('../middlewares/users');

const {checkEmptyNameAndEmailAndPassword, checkEmptyNameAndEmail, filterPassword, hashPassword} = require('../middlewares/users');

const {checkAuth} = require('../middlewares/auth');

const {sendMe} = require('../controllers/users');
  
  // Обрабатываем GET-запрос с роутом '/categories'
usersRouter.get('/users', findAllUsers, sendAllUsers);
// routes/users.js
usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated,
  
);
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);

usersRouter.delete(
  "/users/:id",
  checkAuth,
  deleteUser,
); 
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.get("/me", checkAuth, sendMe);
// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter;
  
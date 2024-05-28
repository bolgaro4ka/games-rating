  // Создаём роут для запросов категорий 
  const categoriesRouter = require('express').Router();
  
  // Импортируем вспомогательные функции
  const {findAllCategories, createCategory} = require('../middlewares/categories');
  const {sendAllCategories, sendCategoryCreated} = require('../controllers/categories');

  const {deleteCategory} = require('../middlewares/categories');
  
  // Обрабатываем GET-запрос с роутом '/categories'
  const {findCategoryById} = require('../middlewares/categories');
  const {sendCategoryById} = require('../controllers/categories');

  const {updateCategory} = require('../middlewares/categories');
  const {sendCategoryUpdated} = require('../controllers/categories');

  const {checkEmptyName, checkIsCategoryExists} = require('../middlewares/categories');

  const {checkAuth} = require('../middlewares/auth');
  
  // Обрабатываем GET-запрос с роутом '/categories'
  categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
  categoriesRouter.post(
    "/categories",
    findAllCategories,
    checkIsCategoryExists,
    checkEmptyName,
    checkAuth,
    createCategory,
    sendCategoryCreated
  );
  
  // Обрабатываем PUT-запрос с роутом '/categories/:id'
  categoriesRouter.delete(
    "/categories/:id",
    checkAuth,
    deleteCategory
  ); 
  
  categoriesRouter.put(
    "/categories/:id",
    checkEmptyName,
    checkAuth,
    updateCategory,
    sendCategoryUpdated
  );
  categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);
  // Экспортируем роут для использования в приложении — app.js
  module.exports = categoriesRouter;
  
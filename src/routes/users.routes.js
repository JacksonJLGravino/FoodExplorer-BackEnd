const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const ensureAuthenticates = require("../middlewares/ensureAuthenticates");

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;

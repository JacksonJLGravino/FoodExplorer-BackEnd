const { Router } = require("express");
const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

const usersController = new UsersController();

//usersRoutes.use(myMiddleware);
usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;

/*function myMiddleware(req, res, next) {
  console.log("voce passou...");

  if (!req.body.isAdmin) {
    return res.json({ message: "usuario nao autorizado" });
  }

  next();
} */

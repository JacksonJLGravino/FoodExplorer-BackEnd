const { Router } = require("express");
const FoodsController = require("../controllers/FoodsController");

const foodsRoutes = Router();

const foodsController = new FoodsController();

//usersRoutes.use(myMiddleware);
foodsRoutes.get("/", foodsController.index);
foodsRoutes.post("/", foodsController.create);
foodsRoutes.get("/:id", foodsController.show);
foodsRoutes.delete("/:id", foodsController.delete);

module.exports = foodsRoutes;

/*function myMiddleware(req, res, next) {
  console.log("voce passou...");

  if (!req.body.isAdmin) {
    return res.json({ message: "usuario nao autorizado" });
  }

  next();
} */

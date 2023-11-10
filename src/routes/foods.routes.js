const { Router } = require("express");
const FoodsController = require("../controllers/FoodsController");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const foodsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const foodsController = new FoodsController();

//usersRoutes.use(myMiddleware);
foodsRoutes.get("/", foodsController.index);
foodsRoutes.post("/", foodsController.create);
foodsRoutes.get("/:id", foodsController.show);
foodsRoutes.delete("/:id", foodsController.delete);
foodsRoutes.put("/:id", foodsController.update);
foodsRoutes.patch("/image", upload.single("image"), (req, res) => {
  console.log(req.file.filename);
  res.json();
});

module.exports = foodsRoutes;

/*function myMiddleware(req, res, next) {
  console.log("voce passou...");

  if (!req.body.isAdmin) {
    return res.json({ message: "usuario nao autorizado" });
  }

  next();
} */

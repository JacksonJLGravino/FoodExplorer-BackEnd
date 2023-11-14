const { Router } = require("express");
const FoodsController = require("../controllers/FoodsController");
const ImageController = require("../controllers/ImageController");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const foodsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const foodsController = new FoodsController();
const imageController = new ImageController();

foodsRoutes.get("/", foodsController.index);
foodsRoutes.post("/", foodsController.create);
foodsRoutes.get("/:id", foodsController.show);
foodsRoutes.delete("/:id", foodsController.delete);
foodsRoutes.put("/:id", foodsController.update);

foodsRoutes.patch("/", upload.single("image"), imageController.create);
foodsRoutes.patch("/:id", upload.single("image"), imageController.update);

module.exports = foodsRoutes;

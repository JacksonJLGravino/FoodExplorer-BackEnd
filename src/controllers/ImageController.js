const knex = require("../database/knex");
const sqliteConnection = require("../database/sqlite");
const DiskStorage = require("../providers/DiskStorage");

class ImageController {
  async create(req, res) {
    const imageFood = req.file.filename;

    const diskStorage = new DiskStorage();

    const database = await sqliteConnection();

    const food = await database.get(
      "SELECT id FROM foods ORDER BY id DESC LIMIT 1"
    );

    const filename = await diskStorage.saveFile(imageFood);
    food.image = filename ?? food.image;

    await database.run(
      `
      UPDATE foods SET
      image = ?
      WHERE id = ?
    `,
      [imageFood, food.id]
    );

    return res.json();
  }

  async update(req, res) {
    const food_id = req.params.id;
    const imageFood = req.file.filename;

    const diskStorage = new DiskStorage();

    const food = await knex("foods").where({ id: food_id }).first();

    if (food.image) {
      await diskStorage.deleteFile(food.image);
    }

    const filename = await diskStorage.saveFile(imageFood);
    food.image = filename;

    await knex("foods").update(food).where({ id: food_id });

    return res.json();
  }
}

module.exports = ImageController;

const knex = require("../database/knex");
const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");

class FoodsController {
  async create(req, res) {
    const { title, description, ingredients, price, type } = req.body;

    const [food_id] = await knex("foods").insert({
      title,
      description,
      price,
      type,
    });

    const ingredientInsert = ingredients.map((name) => {
      return {
        food_id,
        name,
      };
    });

    await knex("ingredients").insert(ingredientInsert);

    return res.json();
  }

  async show(req, res) {
    const { id } = req.params;

    const food = await knex("foods").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ food_id: id })
      .orderBy("name");

    return res.json({ ...food, ingredients });
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("foods").where({ id }).delete();

    return res.json();
  }

  async index(req, res) {
    const { title, type } = req.query;

    let foods = await knex("foods")
      .where("type", `${type}`)
      .whereLike("title", `%${title}%`);

    const foodsIngredients = await knex("ingredients");
    const foodsWithIngredients = foods.map((food) => {
      const foodIngredients = foodsIngredients.filter(
        (ingredient) => ingredient.food_id === food.id
      );

      return {
        ...food,
        ingredients: foodIngredients,
      };
    });

    return res.json({ foodsWithIngredients });
  }

  async update(req, res) {
    const { title, description, ingredients, price, type } = req.body;
    const food_id = req.params.id;

    const database = await sqliteConnection();
    const food = await database.get("SELECT * FROM foods WHERE id = (?)", [
      food_id,
    ]);

    if (!food) {
      throw new AppError("Prato não encontrado");
    }

    const newIngredient = ingredients.map((name) => {
      return {
        food_id,
        name,
      };
    });

    await knex("ingredients").where({ food_id }).delete();

    await knex("ingredients").insert(newIngredient);

    food.title = title ?? food.title;
    food.description = description ?? food.description;
    food.price = price ?? food.price;
    food.type = type ?? food.type;

    await database.run(
      `
      UPDATE foods SET
      title = ?,
      description = ?, 
      price = ?, 
      type = ?
      WHERE id = ?
    `,
      [food.title, food.description, food.price, food.type, food_id]
    );

    return res.json({ ...food, newIngredient });
  }
}

module.exports = FoodsController;

//description, ingredients, price, type

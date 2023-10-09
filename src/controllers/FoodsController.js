const knex = require("../database/knex");

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

    res.json();
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
    const { title, ingredients } = req.query;

    let foods;

    if (ingredients) {
      const filterIngredients = ingredients.split(",").map((tag) => tag.trim());
      foods = await knex("ingredients")
        .select(["foods.id", "foods.title"])
        .whereLike("foods.title", `%${title}%`)
        .whereIn("name", filterIngredients)
        .innerJoin("foods", "foods.id", "ingredients.food_id")
        .orderBy("foods.title");
    } else {
      foods = await knex("foods").whereLike("title", `%${title}%`);
    }

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
}

module.exports = FoodsController;

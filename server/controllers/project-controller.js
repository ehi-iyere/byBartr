const knex = require("knex")(require("../knexfile"));

async function validateUser(user_id) {
  try {
    const data = await knex("users").where("id", id).first();
    return true;
  } catch (error) {
    console.log(`No valid user ${error}`);
    return false;
  }
}

function validateString(string) {}

const createProject = async (req, res) => {
  const regex = /[A-Z]/g;
  if (
    !validateUser(req.body.user_id) &&
    !req.body.title.match(regex) &&
    !req.body.description.match(regex)
  ) {
    return res.status(400).json({ message: "Incomplete body" });
  }
  try {
    const id = await knex("projects").insert(req.body);
    const data = await knex("projects").where("id", id[0]).first();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving users: ${err}`);
  }
};
module.exports = {};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const projects = require("../seed-data/projects.js");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("projects").del();
  await knex("projects").insert(projects);
};

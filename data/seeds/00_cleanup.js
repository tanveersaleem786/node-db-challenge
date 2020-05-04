
exports.seed = async function(knex) {
  knex("projects").truncate()
  knex("resources").truncate()
  knex("tasks").truncate()
  knex("projects_resources").truncate()
};

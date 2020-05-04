
exports.seed = async function(knex) {
 
      await knex('resources').insert([
        {id: 1, name: "Computer", description: "Windows XP"},
        {id: 2, name: "Camera"},
        {id: 3, name: "Meeting Room"}
      ]);
    
};

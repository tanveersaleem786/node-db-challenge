
exports.seed = async function(knex) {  

      return knex('projects').insert([
        //{id: 1, name: "Project 1", description:"this is first project", completed: false},
        {id: 1, name: "Project 1", description:"this is first project"},
        {id: 2, name: "Project 2"},
        {id: 3, name: "Project 3"}
      ]);
   
};


exports.seed = async function(knex) {
  
      await knex('tasks').insert([
        //{id: 1, description: "Task 1", notes: "Task 1 99% done", completed: true},
        {id: 1, project_id: 1, description: "Task 1", notes: "Task 1 99% done"},
        {id: 2, project_id: 1, description: "Task 2"},
        {id: 3, project_id: 2, description: 'Task 3'}
      ]);
   
};

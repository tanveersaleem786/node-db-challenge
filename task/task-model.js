const db = require("../data/config")

function getTasks() {
    
    return db("tasks as t")
           .join("projects as p", "p.id","t.project_id")
           .select("t.description as taskDescription", "t.notes as taskNotes", 
           "t.completed as taskStatus","p.name as projectName", "p.description as projectDescription")
}

function taskByID(id) {
    return db("tasks").where("id",id).first()
}


function addTask(task) {
    return db("tasks").insert(task)
}

module.exports = {
    getTasks,
    taskByID,
    addTask
}
const db = require("../data/config")

function getProjects() {
    return db("projects")
}

function projectByID(id) {
    return db("projects").where("id",id).first()
}

function tasksByProjectID(id) {
    return db("tasks").where("project_id",id).select("id","description","notes","completed")
}

// function resourcesByProjectID(id) {
//     return db("projects_resources as pr")
//            .join("resources as r", "pr.resource_id", "r.id")
//            .where("pr.project_id",id)
//            .select("r.id","r.name","r.description")
// }

function addProject(project) {   
    return db("projects").insert(project)
}

module.exports = {
    getProjects,
    projectByID,
    tasksByProjectID,
    resourcesByProjectID,
    addProject


}
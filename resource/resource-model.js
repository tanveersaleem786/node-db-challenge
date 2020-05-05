const db = require("../data/config")

function getResource() {
    return db("resources")
}

function resourceByID(id) {
    return db("resources").where("id",id).first()
}

function addResource(resource) {
    return db("resources").insert(resource)          
}

module.exports = {
    getResource, 
    addResource,
    resourceByID
}

const express = require("express")
const projectRouter = require("./project/project-router")
const resourceRouter = require("./resource/resource-router")
const taskRouter = require("./task/task-router")

const server = express()
server.use(express.json())
server.use("/api/projects",projectRouter)
server.use("/api/resources",resourceRouter)
server.use("/api/tasks",taskRouter)

server.use((req, res) => {
    res.status(404).json({message: "Route not found"})
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({error: "Something went wrong"})
})

module.exports = server


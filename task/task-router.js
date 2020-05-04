const express = require("express")
const taskModel = require("./task-model")
const projectModel = require("../project/project-model")

const router = express.Router()


// Get All Tasks
router.get("/", async (req, res, next) => {    
    
    try {
           const tasks = await taskModel.getTasks()           
           res.json(tasks)
    } catch(err) {
        next(err)
    }

})

// add Task
router.post("/", validateTask(), validateProjectID(), async (req, res, next) => {
    
    try {
           const payload = {
                project_id: req.body.project_id,
                description: req.body.description,
                notes: req.body.notes,
                completed: req.body.completed
           }        
           const [id] = await taskModel.addTask(payload)
           const task = await taskModel.taskByID(id)
           res.status(201).json(task)
    } catch(err) {
        next(err)
    }

})

function validateTask() {

    return async (req, res, next) => {

            if(req.body.constructor === Object && Object.keys(req.body).length ===0) {
                res.status(404).json({message: "Missing task Data"})
            }else if(!req.body.description) {
                res.status(404).json({message: "Task description is required"})
            }else if(!req.body.project_id) {
                res.status(404).json({message: "Project ID is required"})
            }else {
                next()
            }

    }
}

function validateProjectID() {

    return async (req, res, next) => {
            const project = await projectModel.projectByID(req.body.project_id)
            if(project) {
                next()
            } else {
                res.status(404).json({message: "Invalid Project ID"})
            }    

    }
}


module.exports = router
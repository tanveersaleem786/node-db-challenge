const express = require("express")
const projectModel = require("./project-model")

const router = express.Router()


// Get All Projects
router.get("/", async (req, res, next) => {
    

    try {
           const projects = await projectModel.getProjects()           
           res.json(projects)
    } catch(err) {
        next(err)
    }

})

// Get Project Detail by ID
router.get("/:id", async (req, res, next) => {
    

    try {
           const project_id = req.params.id
           const project = await projectModel.projectByID(project_id)  
           const updatedProject = {...project, completed: project.completed == 0 ? false : true}    
           
           // Getting All Task Related of Project
           const tasks = await projectModel.tasksByProjectID(project_id)
           const updatedTasks = tasks.map((task)=> task = {...task, completed: task.completed == 0 ? false : true})

            // Getting All Resources Related of Project
            const resources = await projectModel.resourcesByProjectID(project_id)          
           
           const projectData = {...updatedProject,tasks:updatedTasks,resources:resources}
           res.json(projectData)
    } catch(err) {
        next(err)
    }

})

// Add Project
router.post("/", validateProject(), async (req, res, next) => {
    
    try {
           const payload = {
                name: req.body.name,
                description: req.body.description,
                completed: req.body.completed
           }        
           const [id]    = await projectModel.addProject(payload) 
           const project = await projectModel.projectByID(id)           
           res.status(201).json(project)
    } catch(err) {
        next(err)
    }

})

function validateProject() {

    return async (req, res, next) => {

            if(req.body.constructor === Object && Object.keys(req.body).length ===0) {
                res.status(404).json({message: "Missing project Data"})
            }else if(!req.body.name) {
                res.status(404).json({message: "Project Name is required"})
            }else {
                next()
            }

    }
}

module.exports = router
const express = require("express")
const resourceModel = require("./resource-model")

const router = express.Router()

// Get All Resources
router.get("/", async (req, res, next) => {
  
   try {  
         const resources = await resourceModel.getResource()
         res.json(resources)
   } catch(err) {
      next(err)
   }

})

// Add Resource
router.post("/", validateResource(), async (req, res, next) => {
    
    try {
           const payload = {
                 name: req.body.name,
                 description: req.body.description                
           }
           const [id]     =  await resourceModel.addResource(payload)
           const resource =  await resourceModel.resourceByID(id)
           res.status(201).json(resource)
    } catch(err) {
        next(err)
    }
})


function validateResource() {

    return async (req, res, next) => {

            if(req.body.constructor === Object && Object.keys(req.body).length ===0) {
                res.status(404).json({message: "Missing resource Data"})
            }else if(!req.body.name) {
                res.status(404).json({message: "Resource Name is required"})
            }else {
                next()
            }

    }
}






module.exports = router
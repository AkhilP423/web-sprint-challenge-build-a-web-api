// Write your "projects" router here!
const Projects = require("./projects-model")
const express = require("express")

const router = express.Router()
const {validateProjectId, validateProject} = require("./projects-middleware")


//file done with some errors running. def need to review over the weekend

//initial router.get for post
router.get("/", (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({message: 'The posts information could not be retrieved'})
        })
})

router.get("/:id", validateProjectId, (req,res, next) => {
    try{
        res.status(200).json(req.params)
    } catch(err){
        next(err)
    }
})

//post and put done
router.post('/', (req, res) => {
    const newProject = req.body
    Projects.insert(newProject)
        .then(project => {
            res.status(201).json(newProject)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
              message: 'Error adding the project',
            })
          })
})

router.put("/:id", validateProjectId, validateProject, (req,res, next) => {
    const {name, description, completed} = req.body
    if(!name || !description, !completed){
        res.status(400).json({message: 'Project ID does not exist'})
    } else{
        Projects.update(req.params.id, req.body)
            .then(() => {
                return Projects.get(req.params.id)
            })
            .then(project => {
                res.json(project)
            })
            .catch(next)
    }
})

//delete finished.
router.delete("/:id", validateProjectId, async (req, res, next) => {
    try{
        await Projects.remove(req.params.id)
        res.json(res.Projects)
    } catch(err){
        next(err)
    }
})

router.get("/:id/actions", validateProjectId, async (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            if(actions.length > 0){
                res.status(200).json(actions)
            } else {
                res.status(404).json((actions))
            }
        })
        .catch(next)
})

module.exports = router
// add middlewares here related to projects
const Projects = require("./projects-model")

//validation code done
async function validateProjectId(req, res, next){
    try{
        const {id} = req.params
        const project = await Projects.get(id)
        if(project){
            req.params = project
            next()
        } else{
            next({status: 404, message: 'Error: Project Not Found.'})
        }
    }catch(err){
        next(err)
    }
}
//testing for name and description done.
async function validateProject(req, res,next){
    const {name, description, completed} = req.body
    if(!name || !name.trim()){
        res.status(400).json({message: 'Missing Name Field (Required)'})
    } else if(!description || !description.trim()){
        res.status(400).json({message: 'Missing Description Field (Required)'})
    } else{
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
    }
}

module.exports = {validateProjectId, validateProject}
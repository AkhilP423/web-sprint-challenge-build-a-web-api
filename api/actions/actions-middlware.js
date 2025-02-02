// add middlewares here related to actions
//page may need some work
const Action = require('./actions-model')
//validation code done, error messages are returning on tests

async function validateActionId(req, res, next){
    try{
        const action = await Action.get(req.params.id)
        if(!action){
            res.status(404).json({message: 'No actions with specified ID'})
        } else{
            req.action = action
            next()
        }
    }catch(err){
        res.status(500).json({message: 'Error: Action not fond'})
    }
}

async function validateAction (req, res, next){
    const {project_id, description, notes, completed} = req.body
    if(!project_id){
        res.status(400).json({message: 'Missing Project ID (Required)'})
    }
    if(!notes || !notes.trim){
        res.status(400).json({message: 'Missing Project Notes (Required)'})
    } else{
        req.project_id = project_id
        req.description = description.trim()
        req.notes = notes.trim()
        req.completed = completed
        next()
    }
}

module.exports = {validateActionId, validateAction}
import { ApiError } from '../helper/ApiError.js'
import { selectAllTasks, insertTask, removeTask } from '../models/task.js'

// Hakee kaikki tehtävät
const getTasks = async (req, res, next) => {
    try {
        const result = await selectAllTasks()
        // Palauttaa tehtävät JSON muodossa
        return res.status(200).json(result.rows || [])
    } 
    catch (error) {
        return next(error)
    }
}

// Luo uuden tehtävän
const postTask = async (req, res, next) => {
    const { task } = req.body
    try {
        // Tarkistaa että discription on annettu eikä se ole tyhjä
        if (!task || !task.description || task.description.trim().length === 0) {
            return next(new ApiError('Task description is required', 400))
            /*const error = new Error('Task description is required')
            error.status = 400
            return next(error)*/
        }
        // Lisää tehtävän tietokantaan
        const result = await insertTask(task.description)
        return res.status(201).json({id: result.rows[0].id, description: result.rows[0].description})
    }
    catch (error) {        
    }
}

// Poistaa tehtävän
const deleteTask = async (req, res, next) => {
    const { id } = req.params
    try {
        // Poistaa tehtävän tietokannasta
        const result = await removeTask(id)
        if (result.rowCount === 0) {
            return next(new ApiError('Task not found', 404))
        }
        return res.status(200).json({ id })
    }
    catch (error) {
        return next(error)
    }
}

export { getTasks, postTask, deleteTask }
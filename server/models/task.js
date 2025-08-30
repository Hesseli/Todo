import { pool } from '../helper/db.js'

// Hakee kaikki tehtävät tietokannasta
const selectAllTasks = async () => {
    return await pool.query('SELECT * FROM task')
}

// Lisää tehtävän tietokantaan
const insertTask = async(description) => {
    return await pool.query('insert into task (description) values ($1) returning *',[description])
}

// Poistaa tehtävän tietokannasta id:n perusteella
const removeTask = async(id) => {
    return await pool.query('delete from task WHERE id = $1', [id])
}

// Funktioiden vienti muill moduuleille
export { selectAllTasks, insertTask, removeTask }
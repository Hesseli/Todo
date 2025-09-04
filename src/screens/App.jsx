import { useEffect, useState } from 'react'
import { useUser } from '../context/useUser.js'
import '../App.css'
import axios from 'axios'
import Row from '../components/Row.jsx'

// API:n perusosoite
const url = "http://localhost:3001"

function App() {
  const [task, setTask] = useState('') // Uuden tehtävän arvo
  const [tasks, setTasks] = useState([]) // Kaikki tehtävät listattuna
  const { user } = useUser() // Käyttäjätiedot contextista

  // Haetaan tehtävät backendistä
  useEffect(() => {
    axios.get(url)
      .then(response => {
        setTasks(response.data) // Tallennetaan haetut tehtävät listaan
      })

      .catch(error => {
        // Näytetään virheviesti jos sellainen tulee
        alert(error.response.data ? error.response.data.message : error)
      })
  }, [])

  // Uuden tehtävän lisääminen
  const addTask = () => {
    const headers = { headers: { Authorization: user.token } }
    const newTask = { description: task }
    axios.post(url + "/create", { task: newTask }, headers)
      .then(response => {
        // Lisää uuden tehtävän listaan ja tyhjentää input kentän
        setTasks([...tasks, response.data])
        setTask("")
      })
  }

  // Tehtävän poistaminen
  const deleteTask = (deleted) => {
    const headers = { headers: { Authorization: user.token } }
    console.log(headers);
    axios.delete(url + "/delete/" + deleted, headers)
      .then(response => {
        // Suodattaa poistetun tehtävän pois listasta
        setTasks(tasks.filter(item => item.id !== deleted))
      })
  }

  return (
      <div id="container">
        <h3>Todos</h3>
        <form>
          <input placeholder='Add new task' 
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => {
            // Enterillä lisätään tehtävä
            if (e.key === 'Enter') {
              e.preventDefault()
              addTask()
            }
          }}
        />

        </form>
        <ul>
          {
            tasks.map(item => (
              // Jokainen rivi on oma Row komponentti
              <Row item={item} key={item.id} deleteTask={deleteTask}/>
            ))
          }
        </ul>
      </div>
  )
}

export default App

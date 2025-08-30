import { useState } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios'

export default function UserProvider({ children }) {
  // Haetaan käyttäjä istunnon muistista
  const userFromStorage = sessionStorage.getItem('user')
  // Tallennetaan käyttäjän tiedot tilaan email ja password. Oletuksena tyhjä, mutta jos käyttäjä löytyy, käytetään sitä
  const [user, setUser] = useState(userFromStorage ? JSON.parse(userFromStorage) : { email: "", password: "" })

  // Käyttäjän rekisteröityminen
  const signUp = async () => {
    const headers = { headers: { 'Content-Type': 'application/json' } }
    await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, JSON.stringify({ user: user }), headers)
    setUser({ email: "", password: "" })
  }

  // Käyttäjän kirjautuminen
  const signIn = async (email, password) => {
    const headers = { headers: { 'Content-Type': 'application/json' } }
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signin`, JSON.stringify({ user: user }), headers)

    // Tallennetaan backendista saadun käyttäjän tiedot data tilaan ja istunnon muistiin jotta ne säilyy selainta päivitettäessä
    setUser(response.data)
    sessionStorage.setItem('user', JSON.stringify(response.data)) 
  }

  return (
    <UserContext.Provider value={{ user, setUser, signUp, signIn }}>
      {children}
    </UserContext.Provider>
  )
}
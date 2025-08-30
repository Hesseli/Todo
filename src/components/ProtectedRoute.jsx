import { useUser } from '../context/useUser.js'
import { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedRoute() {
  const { user } = useUser()

  // Jos käyttäjää ei ole tai token puuttuu, ohjataan käyttäjä kirjautumissivulle
  if (!user || !user.token) return <Navigate to="/signin" replace />
  // Jos käyttäjä on kirjautunut, (token löytyy) näytetään sivun sisältö
  return <Outlet />
}
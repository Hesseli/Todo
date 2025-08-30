import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './screens/App.jsx'
import Authentication, { AuthenticationMode } from './screens/Authentication.jsx'
import UserProvider from './context/userProvider.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NotFound from './screens/NotFound.jsx'

// Sovelluksen reittien määrittely
const router = createBrowserRouter([
  {
    // Jos reitit ei täsmää, näytetään NotFound sivu
    errorElement: <NotFound />,
    children: [
      {
        // Kirjautuminen
        path: "/signin",
        element: <Authentication authenticationMode={AuthenticationMode.SignIn} />
      },
      {
        // Rekisteröityminen
        path: "/signup",
        element: <Authentication authenticationMode={AuthenticationMode.SignUp} />
      },
      {
        // Suojattu reitti joka tarkistaa esim. onko käyttäjä kirjautunut
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <App />
          }
        ]
      }
    ]
  }
])

// Luodaan root ja renderöidään sovellus
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/*UserProvider tarjoaa käyttäjän tiedot ja autentikointifunktiot koko sovellukselle*/}
      <RouterProvider router={router} /> {/*RouteProvider vastaa navigoinnista ja reittien hallinnasta*/}
    </UserProvider>
  </StrictMode>,
)
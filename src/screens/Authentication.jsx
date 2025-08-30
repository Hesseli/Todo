import {Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/useUser.js'

export const AuthenticationMode = Object.freeze({
  SignIn: 'Login',
  SignUp: 'SignUp'
})

export default function Authentication({ authenticationMode }) {
  // Haetaan user contextista käyttäjän tila ja funktiot
  const { user, setUser, signUp, signIn } = useUser()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Päätetään käytettävä funktio, signup tai sigin
    const signFunction = authenticationMode === AuthenticationMode.SignUp ? signUp : signIn;

    // Suoritetaan oikea funktio
    signFunction()
      .then(response => {
        // Jos rekisteröidytään, siirrytään sigin sivulle ja jos kirjaudutaan, siirrytään etusivulle
        navigate(authenticationMode === AuthenticationMode.SignUp ? '/signin' : '/')
      })
      .catch(error => {
        // Jos tulee virhe näytetään se selaimessa
        alert(error)
      })
  }

  return (
    <div>
      {/*Otsikko riippuu kirjautumis- tai rekisteröintitilasta*/}
      <h3>{authenticationMode === AuthenticationMode.SignIn ? 'Sign in' : 'Sign up'}</h3>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          placeholder='Email'
          value={user.email}
          onChange={e => setUser({...user, email: e.target.value})}
        />
        <label>Password</label>
        <input
          placeholder='Password'
          type='password'
          value={user.password}
          onChange={e => setUser({...user, password: e.target.value})}
        />
        <button type='submit'>{authenticationMode === AuthenticationMode.SignIn ? "Login" : "Submit"}</button>
        {/*Linkki sigin sivulta signup sivulle ja päinvastoin*/}
        <Link to={authenticationMode === AuthenticationMode.SignIn ? '/signup' : '/signin'}>
          {authenticationMode === AuthenticationMode.SignIn ? 'No account? Sign up' : 'Already signed up? Sign in'}
        </Link>
      </form>
    </div>
  )
}
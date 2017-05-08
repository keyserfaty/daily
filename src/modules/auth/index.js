import xs from 'xstream'
import storageDriver from '@cycle/storage'

/**
 * Login click
 * Sign up click
 * Save user data to localStorage
 * Get user from localStorage
 */

function intent (DOMSource) {
  const loginClick$ = DOMSource.select('.login .sign-in').events('click')
  const signUpClick$ = DOMSource.select('.login .sign-up').events('click')
  const saveUser$ = DOMSource.select()
  const getUser$ = DOMSource.select()

  return {
    loginClick$,
    signUpClick$,
    saveUser$,
    getUser$,
  }
}

function model (loginClick$, signUpClick$, saveUser$, getUser$) {
  const loginClick = loginClick$
    .
}

function view (state$) {
  return state$.map(state => (
    <div className="login">
      <button className="sign-in">Sign in with Google</button>
      <hr/>
      <button className="sign-up">Sign up with Google</button>
    </div>
  ))
}

function Login (sources) {
  const {
    loginClick$,
    signUpClick$,
    saveUser$,
    getUser$,
  } = intent(sources.DOM)
  const state$ = model(loginClick$, signUpClick$, saveUser$, getUser$)
  const vtree$ = view(state$)

  return {
    DOM: vtree$,
  }
}

export default Login

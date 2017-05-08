import xs from 'xstream'
import { html } from 'snabbdom-jsx';
import storageDriver from '@cycle/storage'
import { isNil } from 'ramda'

import { arrow, menu, list, container, header, image, user } from './styles'

// DOM read effect: menu click
// LocalStorage read effect: look up user on load ->
// HTTP read effect: user response
// HTTP write effect: user logout request

function intent (DOMSource, localStorage) {
  const menuClick$ = DOMSource.select('.header .menu').events('click')

  const userStorageRetrieve$ = localStorage.local.getItem('user')
  const tokenStorageRetrieve$ = localStorage.local.getItem('session_token')

  const logoutClick$ = DOMSource.select('.header .menu #logout').events('click')
  const logoutRequest$ = logoutClick$.map(() => {
    return {
      url: '',
      method: 'POST',
    }
  })

  return {
    menuClick$,
    userStorageRetrieve$,
    tokenStorageRetrieve$,
    logoutClick$,
    logoutRequest$,
  }
}

function model (menuClick$, userStorageRetrieve$, tokenStorageRetrieve$, logoutClick$, logoutRequest$) {
  const menuToggle = menuClick$
    .startWith(false)
    .mapTo(1)
    .fold((acc, x) => acc + x, 0)
    .map(x => x % 2 === 0)

  const userData = !isNil(userStorageRetrieve$) && !isNil(userStorageRetrieve$)
    ? userStorageRetrieve$
    .map(user => JSON.parse(user))

    : null

  return xs
  .combine(
    menuToggle,
    userData,
  ).map(([toggle, user]) => ({
    toggle,
    user,
  }))
}

function view (state$) {
  return state$.map(state => (
    <header className="header" style={header}>
      <div className="menu" style={menu}>
        <div className="user" style={container}>
          <div className="image" style={image} />
          <div className="name" style={user}>{`${state.user.name_first} ${state.user.name_last}`}</div>
          <div className="arrow" style={arrow} />
        </div>
        { state.toggle
          ? <div className="items" style={list}>
              <span id="logout">Cerrar sesión</span>
            </div>
          : <div />
        }
      </div>
    </header>
  ))
}

function Header (sources) {
  const {
    menuClick$,
    userStorageRetrieve$,
    tokenStorageRetrieve$,
    logoutClick$,
    logoutRequest$
  } = intent(sources.DOM, sources.storage)

  const state$ = model(menuClick$, userStorageRetrieve$, tokenStorageRetrieve$, logoutClick$, logoutRequest$)
  const vtree$ = view(state$)

  return {
    DOM: vtree$,
  }
}

export default Header

import xs from 'xstream'
import { html } from 'snabbdom-jsx';
import storageDriver from '@cycle/storage'
import { isNil } from 'ramda'

import { arrow, menu, list, container, header, image, user } from './styles'

function intent (DOMSource, localStorage) {
  return xs.merge(
    DOMSource.select('.header .menu').events('click')
    .startWith(false)
    .mapTo(1)
    .fold((acc, x) => acc + x, 0)
    .map(x => x % 2 === 0)
    .map(payload => ({ type: 'toggleMenu', payload })),

    localStorage.local.getItem('user')
    .map(user => JSON.parse(user))
    .map(payload => ({ type: 'userFromStorage', payload }))
  )
}

function model (action$) {
  const menuToggle$ = action$
  .filter(a => a.type === 'toggleMenu')
  .map(action => ({
    toggle: action.payload,
  }))

  const userData$ = action$
  .filter(a => a.type === 'userFromStorage')
  .map(action => ({
    user: action.payload,
  }))

  return xs.merge(
    menuToggle$,
    userData$,
  )
}

function view (state$) {
  return state$.map(state => {
    return (
      <header className="header" style={header}>
        <div className="menu" style={menu}>
          <div className="user" style={container}>
            <div className="image" style={image} />
            <div className="name" style={user}>{!isNil(state.user) ? `${state.user.name_first} ${state.user.name_last}` : ''}</div>
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
    )
  })
}

function Header (sources) {
  return {
    DOM: view(model(intent(sources.DOM, sources.storage))),
  }
}

export default Header

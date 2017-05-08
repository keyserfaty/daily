import xs from 'xstream'
import { html } from 'snabbdom-jsx';
import { arrow, menu, list, container, header, image, user } from './styles'
import storageDriver from '@cycle/storage'

// DOM read effect: menu click
// LocalStorage read effect: look up user on load ->
// HTTP read effect: user response
// HTTP write effect: user logout request

function intent (DOMSource, localStorage) {
  const menuClick$ = DOMSource.select('.header .menu').events('click')
  //const userRetrieve$ = localStorage.getItem('user_id').events('onload')
  const userResponse$ = DOMSource.select('.header').events('onload')
  const logoutClick$ = DOMSource.select('.header .menu #logout').events('click')
  const logoutRequest$ = logoutClick$.map(() => {
    return {
      url: '',
      method: 'POST',
    }
  })

  return {
    menuClick$,
    //userRetrieve$,
    userResponse$,
    logoutClick$,
    logoutRequest$,
  }
}

function model (menuClick$, userRetrieve$, userResponse$, logoutClick$, logoutRequest$) {
  const menuToggle = menuClick$
    .startWith(false)
    .mapTo(1)
    .fold((acc, x) => acc + x, 0)
    .map(x => x % 2 === 0)

  //const userRetrieve = userRetrieve$
  //  .startWith('')

  return xs
  .combine(
    menuToggle,
  ).map(([toggle]) => ({
    toggle,
  }))
}

function view (state$) {
  return state$.map(state => (
    <header className="header" style={header}>
      <div className="menu" style={menu}>
        <div className="user" style={container}>
          <div className="image" style={image} />
          <div className="name" style={user}>Karen Serfaty</div>
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
    //userRetrieve$,
    userResponse$,
    logoutClick$,
    logoutRequest$
  } = intent(sources.DOM, sources.storage.local)

  const state$ = model(menuClick$)
  const vtree$ = view(state$)

  return {
    DOM: vtree$,
  }
}

export default Header

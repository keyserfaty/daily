import xs from 'xstream'
import { html } from 'snabbdom-jsx';
import { arrow, menu, list, container, header, image, user } from './styles'

// DOM read effect: menu click
// HTTP read effect: user response
// HTTP write effect: user logout request

const intent = DOMSource => {
  const menuClick$ = DOMSource.select('.header .menu').events('click')
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
    userResponse$,
    logoutClick$,
    logoutRequest$,
  }
}

const model = (menuClick$, userResponse$, logoutClick$, logoutRequest$) => xs
  .combine(
    menuClick$
    .startWith(false)
    .mapTo(1)
    .fold((acc, x) => acc + x, 0)
    .map(x => x % 2 === 0)

  ).map(([toggle]) => ({
    toggle,
  })
)

const view = state$ => state$.map(state => (
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

const main = sources => {
  const {
    menuClick$,
    userResponse$,
    logoutClick$,
    logoutRequest$
  } = intent(sources.DOM)

  const state$ = model(menuClick$, userResponse$, logoutClick$, logoutRequest$)
  const vtree$ = view(state$)

  return {
    DOM: vtree$
  }
}

export default main

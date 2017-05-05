import xs from 'xstream'
import { html } from 'snabbdom-jsx';
import { arrow, menu, list, container, header, image, user } from './styles'

const Header = sources => {
  const userClick$ = sources.DOM.select('.user').events('click')

  const menuToggle$ = userClick$
    .mapTo(1)
    .fold((acc, x) => acc + x, 0)
    .map(x => x % 2 === 0)

  const header$ = menuToggle$
  .map(click =>
    <header style={header}>
      <div style={menu} className="menu">
        <div className="user" style={container}>
          <div className="image" style={image} />
          <div className="name" style={user}>Karen Serfaty</div>
          <div className="arrow" style={arrow} />
        </div>
        { click
          ? <div />
          : <div style={list} className="list">
              Cerrar sesión
            </div>
        }
      </div>
    </header>
  )

  return header$
}

export default Header

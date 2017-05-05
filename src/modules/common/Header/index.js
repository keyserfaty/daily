import xs from 'xstream'
import { html } from 'snabbdom-jsx';
import { arrow, menu, list, container, header, image, user } from './styles'

const Header = sources => {
  const menuClick$ = sources.DOM.select('.header .menu').events('click')

  const menuToggle$ = menuClick$
    .mapTo(1)
    .fold((acc, x) => acc + x, 0)
    .map(x => x % 2 === 0)

  const header$ = menuToggle$
  .map(toggled =>
    <header className="header" style={header}>
      <div className="menu" style={menu}>
        <div className="user" style={container}>
          <div className="image" style={image} />
          <div className="name" style={user}>Karen Serfaty</div>
          <div className="arrow" style={arrow} />
        </div>
        { toggled
          ? <div />
          : <div className="items" style={list}>
              Cerrar sesión
            </div>
        }
      </div>
    </header>
  )

  return header$
}

export default Header

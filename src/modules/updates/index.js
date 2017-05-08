import { span } from '@cycle/dom'
import { html } from 'snabbdom-jsx';
import xs from 'xstream'

import Header from '../common/Header'
import UserUpdate from './components/UserUpdate'
//import Update from './components/Update'

function main (sources) {
  const header = Header(sources)
  const userUpdate = UserUpdate(sources)

  const items = xs.combine(
    header.DOM,
    userUpdate.DOM
  )

  const vtree$ = items
    .map(([header, userUpdate]) => (
      <span>
        {header}
        {userUpdate}
      </span>
    ))

  return {
    DOM: vtree$
  }
}

export default main

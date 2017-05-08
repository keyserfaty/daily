import { span } from '@cycle/dom'
import { html } from 'snabbdom-jsx';
import xs from 'xstream'

import Header from '../common/Header/index'
//import UserUpdate from './components/UserUpdate'
//import Update from './components/Update'

function main (sources) {
  const header = Header(sources)

  const vtree$ = header.DOM
    .map(dom => <span>{dom}</span>)

  return {
    DOM: vtree$
  }
}

export default main

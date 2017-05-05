import { span } from '@cycle/dom'
import xs from 'xstream'

import Header from '../common/Header'
import UserUpdate from './components/UserUpdate'
import Update from './components/Update'

function main (sources) {
  const vtree$ = xs
  .combine(Header)
  .map(([Header]) => {
    console.log(Header)
    return span([
      Header
    ])
  })

  return {
    DOM: vtree$
  }
}

export default main

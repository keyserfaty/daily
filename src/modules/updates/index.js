import {html} from 'snabbdom-jsx';
import xs from 'xstream'

import Header from '../common/Header'
import UserUpdate from './components/UserUpdate'
import Update from './components/Update'

const App = sources => {
  const main$ = xs.of(false)
  .map(s =>
    <span>
      <Header />
      <UserUpdate />
      <Update />
    </span>
  )

  const sinks = {
    DOM: Header(sources),
  }
  return sinks
}

export default App

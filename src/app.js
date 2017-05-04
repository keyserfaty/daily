import {html} from 'snabbdom-jsx';
import xs from 'xstream'

import Header from './modules/common/Header'
import UserUpdate from './modules/updates/components/UserUpdate'
import Update from './modules/updates/components/Update'

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
    DOM: main$,
  }
  return sinks
}

export default App

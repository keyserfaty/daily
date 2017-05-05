import {html} from 'snabbdom-jsx';
import { span } from '@cycle/dom'
import xs from 'xstream'

import Header from '../common/Header'
import UserUpdate from './components/UserUpdate'
import Update from './components/Update'

const App = sources => {
  const sinks = {
    DOM: Header
  }
  return sinks
}

export default App

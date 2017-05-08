import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import storageDriver from '@cycle/storage'

import main from './modules/updates'
import Header from './modules/common/Header'

const drivers = {
  DOM: makeDOMDriver('#app'),
  storage: storageDriver,
}

run(main, drivers)

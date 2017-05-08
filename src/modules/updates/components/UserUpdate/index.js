import xs from 'xstream'
import { html } from 'snabbdom-jsx';

function intent (DOMSource) {
  const inputChange$ = DOMSource.select('.update .content input').events('input')
  const buttonClick$ = DOMSource.select('.update .content button').events('click')
  const postUserUpdate$ = buttonClick$.map(() => {
    return {
      url: '',
      method: 'POST',
    }
  })

  return {
    inputChange$,
    buttonClick$,
    postUserUpdate$,
  }
}

function model (events) {
  const { inputChange$, buttonClick$ } = events

  const inputValue = inputChange$
    .map(e => e.target.value)
    .startWith('')

  const saveUpdate = buttonClick$
    .map(e => console.log(inputValue))
    .startWith(null)

  return xs.combine(
    inputValue,
    saveUpdate
  ).map(([value, update]) => ({
    value,
    update,
  }))
}

function view (state$) {
  return state$.map(state => (
    <div className="update">
      <div className="image" />
      <div className="content">
        <label>Add your update:</label>
        <input className="input" type="text"/>
        <button>Update!</button>
      </div>
    </div>
  ))
}

function UserUpdate (sources) {
  return {
    DOM: view(model(intent(sources.DOM)))
  }
}

export default UserUpdate

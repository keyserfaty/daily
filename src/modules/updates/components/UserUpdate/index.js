import xs from 'xstream'
import { html } from 'snabbdom-jsx';

function intent (DOMSource) {
  return {}
}

function model (events) {
  return xs.combine().map(x => x)
}

function view (state$) {
  return state$.map(state => (
    <div>
      <div className="update">
        <div className="image" />
        <div className="content">
          <label>Add your update:</label>
          <input type="text"/>
        </div>
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

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

const listOfUpdates = [
  {
    user: {
      name: 'Karen Serfaty',
      picture: '',
    },
    msg: 'Some update from some user'
  },
  {
    user: {
      name: 'Karen Serfaty',
      picture: '',
    },
    msg: 'Some update from some user'
  },
  {
    user: {
      name: 'Karen Serfaty',
      picture: '',
    },
    msg: 'Some update from some user'
  },
  {
    user: {
      name: 'Karen Serfaty',
      picture: '',
    },
    msg: 'Some update from some user'
  }
]

function model (events) {
  const { inputChange$, buttonClick$ } = events

  const inputValue = inputChange$
    .map(e => e.target.value)
    .startWith('')

  const saveUpdate = buttonClick$
    .map(e => console.log(inputValue))
    .startWith(null)

  const updatesList = xs.of(listOfUpdates)

  return xs.combine(
    inputValue,
    saveUpdate,
    updatesList,
  ).map(([value, update, list]) => ({
    value,
    update,
    list,
  }))
}

function view (state$) {
  return state$.map(state => (
    <div>
      <div className="update-add">
        <div className="image" />
        <div className="content">
          <label>Add your update:</label>
          <input type="text"/>
          <button>Update!</button>
        </div>
      </div>
      <div className="update-list">
        {state.list.map(x => (
          <div className="update">
            <div className="user">
              <div className="image" />
            </div>
            <div className="content">
              <div className="user-name">
                {x.user.name} said:
              </div>
              {x.msg}
            </div>
          </div>
        ))}
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

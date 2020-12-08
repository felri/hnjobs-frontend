import Home from 'screens/home';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'store/index.js';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'App.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

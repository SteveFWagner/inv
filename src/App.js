import React, { Component } from 'react';
import{HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import routes from './routes'
import Nav from './components/Nav/Nav'
import store from './dux/store'



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
            <Nav/>
            {routes}
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;

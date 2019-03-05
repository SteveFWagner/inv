import React, { Component } from 'react';
import{HashRouter} from 'react-router-dom'

import routes from './routes'
import Nav from './components/Nav/Nav'




class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Nav/>
          {routes}
        </div>
      </HashRouter>
    );
  }
}

export default App;

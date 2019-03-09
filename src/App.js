import React, { Component } from 'react';
import{withRouter} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import routes from './routes'
import Nav from './components/Nav/Nav'



class App extends Component {
  render() {
    return (
          <div>
            <CssBaseline/>
            <Nav location={this.props.location} history={this.props.history}/>
            {routes}
          </div>

    );
  }
}

export default withRouter(App)

import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Login from './components/Login/Login'
import Materials from './components/Materials/Materials'
import Products from './components/Products/Products'
import Overview from './components/Overview/Overview'
import Create from './components/Create/Create'
import About from './components/About/About'

export default(
    <Switch>
        <Route path='/materials' component={Materials}/>
        <Route path='/products' component={Products}/>
        <Route path='/overview' component={Overview}/>
        <Route path='/create' component={Create}/>
        <Route path='/about' component={About}/>
        <Route exact path='/' component={Login}/>
    </Switch>
)
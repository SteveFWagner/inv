import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Login from './components/Login/Login'
import Materials from './components/Materials/Materials'
import Products from './components/Products/Products'
import Overview from './components/Overview/Overview'
import Create from './components/Create/Create'
import Template from './components/Template/Template'

export default(
    <Switch>
        <Route path='/materials' component={Materials}/>
        <Route path='/products' component={Products}/>
        <Route path='/overview' component={Overview}/>
        <Route path='/template' component={Template}/>
        <Route path='/create' component={Create}/>
        <Route path='/' component={Login}/>
    </Switch>
)
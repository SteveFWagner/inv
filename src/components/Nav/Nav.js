import React, {Component} from 'react'
import {Link} from 'react-router-dom'


class Nav extends Component{
    render(){
        return(
            <div>
                Nav
                <div style={{display:'flex', justifyContent:'space-around'}}>
                    <Link to='/'>Login</Link>
                    <Link to='/overview'>Overview</Link>
                    <Link to='/products'>Products</Link>
                    <Link to='/materials'>Materials</Link>
                    <Link to='/template'>New Product Template</Link>
                    <Link to='/create'>Create Products & Add Inv</Link>
                </div>
            </div>
        )
    }

}
export default Nav
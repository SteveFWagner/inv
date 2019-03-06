import React, {Component} from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import {updateUser} from '../../dux/reducer'


class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:``,
            password:``
        }
        this.handleUserInput=this.handleUserInput.bind(this)
        this.handleRegister=this.handleRegister.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
    }

    handleUserInput(prop,val){
        this.setState({
            [prop]:val
        })
    }

    handleRegister(){
        const {email, password} = this.state
        Axios.post('/auth/register', {email,password}).then(res => {
            this.props.updateUser(res.data)
        }).then(
            this.props.history.push('/overview')
        ).catch(err => alert("Email already exists!"))
    }

    handleLogin(){
        const {email, password} = this.state
        Axios.post('/auth/login',{email,password}).then(res => {
            console.log('res@login',res)
            console.log(this.props)
            this.props.updateUser(res.data)  
        }).then(
            this.props.history.push('/overview')
        ).catch(err=>console.log(err))
    }

    render(){
        return(
            <div>
                   <h1>LOGO</h1><br/>
                   <input placeholder='Email' onChange={(e)=>this.handleUserInput('email',e.target.value)}/> <br/>
                   <input placeholder='Password' onChange={(e)=>this.handleUserInput('password',e.target.value)} type='password'/><br/>
                   <button onClick={this.handleLogin}>Login</button>
                   <button onClick={this.handleRegister}>Register</button>
            </div>
        )
    }

}

function mapStateToProps(state){
    return{
        id:state.id,
        email:state.email
    }
}
export default connect(mapStateToProps,{updateUser})(Login)
import React, {Component} from 'react'
import Axios from 'axios';


class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:``,
            password:``
        }
        this.handleUserInput=this.handleUserInput.bind(this)
        this.handleRegister=this.handleRegister.bind(this)
    }

    handleUserInput(prop,val){
        this.setState({
            [prop]:val
        })
    }

    handleRegister(){
        const {email, password} = this.state
        Axios.post('/auth/register', {email,password}).then(res => {
            console.log(res)
            this.props.history.push('/overview')
            //continue here!
        }).catch(err => alert("Email already exists!"))
    }

    render(){
        return(
            <div>
                   <h1>LOGO</h1><br/>
                   <input placeholder='Email' onChange={(e)=>this.handleUserInput('email',e.target.value)}/> <br/>
                   <input placeholder='Password' onChange={(e)=>this.handleUserInput('password',e.target.value)} type='password'/><br/>
                   <button>Login</button>
                   <button onClick={this.handleRegister}>Register</button>
            </div>
        )
    }

}
export default Login
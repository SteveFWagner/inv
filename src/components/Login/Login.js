import React, {Component} from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import {updateUser} from '../../dux/reducer'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Logo from '../../images/Logo.png'


class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:``,
            password:``,
            width:0,
            height:0
        }
        this.handleUserInput=this.handleUserInput.bind(this)
        this.handleRegister=this.handleRegister.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
    }

    componentDidMount(){
        this.userCheck()
    }

    userCheck(){
        const {id} = this.props
        if(id <= 0){
            Axios.get('/auth/current')
            .then(res => {this.props.updateUser(res.data)})
            .then( () => {
                if(id > 0){
                    this.props.history.push('/overview')
                }
            })
            .catch(err => console.log(err))
        }else if (id > 0){
            this.props.history.push('/overview')
        }
    }

    handleUserInput(prop,val){
        this.setState({
            [prop]:val
        })
    }

    handleRegister =async () =>{
        const {email, password} = this.state
        try{
            let res = await Axios.post('/auth/register', {email,password})
            await this.props.updateUser(res.data)
            await this.props.history.push('/about')
        }catch(err){
            alert("Email already exists!")
        }
    }

    handleLogin = async () =>{
        const {email, password} = this.state
        try{
            let res = await Axios.post('/auth/login',{email,password})
            await this.props.updateUser(res.data)
            await this.props.history.push('/overview')
        }catch(err){
            alert('Incorrect Login')
        }
    }

    render(){
        return(
            <div style={{display:'flex', justifyContent:'center', backgroundColor:'#252525', width:'100%', height:'100vh'}}>
                <Paper elevation={1} style={{width:'80%',height:'65%', display:'flex', flexDirection:'column', 
                alignItems:'center', marginTop:50, maxWidth:450, maxHeight:450}}>
                   <div style={{background:'#1EABFF', width:'100%', borderRadius:3, display:'flex', justifyContent:'center'}}>
                        <img src={Logo} alt='inv' style={{height: '15vh', width:'auto'}}/>
                   </div>
                   <TextField label='Username' onChange={(e)=>this.handleUserInput('email',e.target.value)}/> <br/>
                   <TextField label='Password' onChange={(e)=>this.handleUserInput('password',e.target.value)} type='password'/><br/>
                   <Button variant='contained' onClick={this.handleLogin}>Login</Button><br/>
                   <Button variant='contained' onClick={this.handleRegister}>Register</Button>
                </Paper>
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
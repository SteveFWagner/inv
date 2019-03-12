import React, {Component} from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import {updateUser} from '../../dux/reducer'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
            .catch(err => console.log('no user in dux or sess',err))
        }else if (id > 0){
            this.props.history.push('/overview')
        }
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
                <Paper elevation={1} style={{width:'80vw',height:'60vh', display:'flex', flexDirection:'column', 
                alignItems:'center', marginTop:50}}>
                   <Typography component='h1' variant='h1'>inv.</Typography><br/>
                   <TextField label='Email' onChange={(e)=>this.handleUserInput('email',e.target.value)}/> <br/>
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
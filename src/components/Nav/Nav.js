import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {clearUser, updateUser} from '../../dux/reducer'
import Axios from 'axios';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import InsertChartOutlined from '@material-ui/icons/InsertChartOutlined'
import Extension from '@material-ui/icons/ExtensionOutlined'
import Build from '@material-ui/icons/Build'
import Widgets from '@material-ui/icons/Widgets'
import Logo from '../../images/Logo.png'
import HelpOutline from '@material-ui/icons/HelpOutline'


class Nav extends Component{
    constructor(props){
        super(props)
        this.state={
            anchorEl:null,
            rightSlide:false
        }

        this.handleLogout=this.handleLogout.bind(this)
    }

    handleRightSlide=(open)=>{
       this.setState({
           rightSlide:open
       }) 
    }

    handleLogout (){
        Axios.post('/auth/logout')
        .then(this.props.clearUser())
        .then(this.props.history.push('/'),
        // console.log(this.props)
        )
    }

    componentDidMount(){
        this.userCheck()
        window.onhashchange = () => {
            this.userCheck()
        }
    }


    userCheck= async ()=>{
        const {id} = this.props
        if(!id){
            try{
                let res = await Axios.get('/auth/current')
                this.props.updateUser(res.data)
                // console.log(res.data)
            }catch(err){
                this.props.history.push('/') //redirect
            }
        }
    }


    render(){
            if(this.props.location.pathname !== '/'){
                return(
                    <div>
                        <AppBar position='static'>
                            <Toolbar style={{display:'flex', justifyContent:'space-between', backgroundColor:'#252525'}}>
                                <Typography variant='h3' color='inherit' style={{display:'flex', flexDirection:'column'}}>
                                    {this.props.email}
                                    <Button color='inherit' onClick={this.handleLogout}>LOGOUT</Button>
                                </Typography>
                                <img src={Logo} alt='inv' style={{height:'10vh', width:'auto'}}/>
                                <Button color='inherit' 
                                onClick={()=>this.handleRightSlide(true)}>
                                        <MenuIcon style={{fontSize:'38'}}/>
                                </Button>                                
                                <Drawer anchor='right' open={this.state.rightSlide} onClose={()=>this.handleRightSlide(false)}>
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={()=>this.handleRightSlide(false)}
                                    onKeyDown={()=>this.handleRightSlide(false)}
                                    >
                                <List>
                                    <ListItem button key='Overview' component={Link} to='/overview'> 
                                        <InsertChartOutlined/>
                                        <ListItemText primary='Overview'/>
                                    </ListItem>
                                    <ListItem button key='Products' component={Link} to='/products'> 
                                        <Widgets/>
                                        <ListItemText primary='Products'/>
                                    </ListItem>
                                    <ListItem button key='Materials' component={Link} to='/materials'> 
                                        <Extension/>
                                        <ListItemText primary='Materials'/>
                                    </ListItem>
                                    <ListItem button key='Create' component={Link} to='/create'> 
                                        <Build/>
                                        <ListItemText primary='Create'/>
                                    </ListItem>
                                    <ListItem button key='About' component={Link} to='/about'> 
                                        <HelpOutline/>
                                        <ListItemText primary='About'/>
                                    </ListItem>
                                </List> 
                                </div>
                                </Drawer>
                               
                            </Toolbar>
                        </AppBar>
                        
                    </div>
                )
            }
        return null    
    }

}




function mapStateToProps(state){
    return{
        id:state.id,
        email:state.email
    }
}
export default connect(mapStateToProps,{clearUser, updateUser})(Nav)
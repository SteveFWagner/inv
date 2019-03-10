import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {clearUser, updateUser} from '../../dux/reducer'
import Axios from 'axios';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MenuIcon from '@material-ui/icons/Menu'
import MenuLink from '@material-ui/core/Link'

class Nav extends Component{
    constructor(props){
        super(props)
        this.state={
            anchorEl:null
        }

        this.handleLogout=this.handleLogout.bind(this)
    }

    handleMenuClick = (e) => {
        this.setState({
            anchorEl:e.currentTarget
        })
    }

    handleMenuClose = () =>{
        this.setState({
            anchorEl:null
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
                console.log(111111, err)
                this.props.history.push('/') //redirect
            }
        }
    }


    render(){
        // console.log('@nav111',this.props.location.pathname)
        const {anchorEl} = this.state
            if(this.props.location.pathname !== '/'){
                return(
                    <div>
                        <AppBar position='static'>
                            <Toolbar style={{display:'flex', justifyContent:'space-between', backgroundColor:'#252525'}}>
                                <Typography variant='h3' color='inherit' style={{display:'flex', flexDirection:'column'}}>
                                    {this.props.email}
                                    <Button color='inherit' onClick={this.handleLogout}>LOGOUT</Button>
                                </Typography>
                                <Typography variant='h1' color='inherit'>
                                    inv
                                </Typography>
                                <Button color='inherit' 
                                aria-owns={anchorEl ? 'menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenuClick}>
                                        <MenuIcon style={{fontSize:'38'}}/>
                                </Button>
                                <Menu
                                id='menu' anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleMenuClose}>
                                    <MenuItem onClick={this.handleMenuClose}>
                                            <MenuLink component={Link} to='/overview'>OVERVIEW</MenuLink>
                                    </MenuItem>
                                    <MenuItem onClick={this.handleMenuClose}>
                                        <MenuLink component={Link} to='/products'>PRODUCTS</MenuLink>
                                    </MenuItem>
                                    <MenuItem onClick={this.handleMenuClose}>
                                        <MenuLink component={Link} to='/materials'>MATERIALS</MenuLink>
                                    </MenuItem>
                                    <MenuItem onClick={this.handleMenuClose}>
                                        <MenuLink component={Link} to='/create'>CREATE</MenuLink>
                                    </MenuItem>
                                </Menu>
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
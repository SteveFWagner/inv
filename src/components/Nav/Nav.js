import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {clearUser, updateUser} from '../../dux/reducer'
import Axios from 'axios';


class Nav extends Component{
    constructor(props){
        super(props)

        this.handleLogout=this.handleLogout.bind(this)
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
    }

    // componentDidUpdate(prevProps,prevState){
    //     console.log("prevProps", prevProps)
    //     console.log('this.props', this.props)
    //     if(prevProps.id !== this.props.id){
    //         this.userCheck()
    //     }
    // }

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
            if(this.props.location.pathname !== '/'){
                return(
                    <div>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                    <h5>Current user: {this.props.email}</h5>
                    <h2>LOGO</h2>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                    <Link to='/overview'>Overview</Link>
                    <Link to='/products'>Products</Link>
                    <Link to='/materials'>Materials</Link>
                    <Link to='/template'>New Product Template</Link>
                    <Link to='/create'>Create Products & Add Inv</Link>
                </div>
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
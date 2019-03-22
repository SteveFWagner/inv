import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Close from '@material-ui/icons/Close'
import Axios from 'axios'

export default class ProductModal extends Component{
    constructor(props){
        super(props)
        this.state={
            name:``,
            id:``,
            onHand:``
        }
    }
    
    componentDidMount(){
        this.mapProduct()
    }

    mapProduct=()=>{
        console.log(this.props)
        this.setState({
            name:this.props.rowData[0],
            id:this.props.rowData[1],
            onHand:this.props.rowData[2]
        })
    }

    handleUserInput=(prop,val)=>{
        this.setState({
            [prop]:val
        })
    }

    handleEdit=()=>{
        const {id, name, onHand} = this.state
        Axios.put(`/api/update/onhand/product/${id}`,{name, onHand})
        .then(() => {
            this.props.refresh()
            this.props.refresh2()
            this.props.closeModal()
            this.props.snackbar('snackbarMessage', `Updated!`)
            this.props.snackbar('snackbar', true)
        })

    }

    render(){
        return(
            <div style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Paper elevation={1} style={{width:'60vw', height:'auto'}}>
                    <div style={{display:'flex', justifyContent:'space-between', padding:10}}>
                        <Typography variant='h4'>Edit {this.state.name}</Typography>
                        <Button style={{margin:5}} onClick={this.props.closeModal}><Close/></Button>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <TextField margin='normal' label='On Hand' style={{width:'60%'}}
                        onChange={(e)=>this.handleUserInput('onHand',e.target.value)} value={this.state.onHand}/>
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <Button variant='outlined' style={{margin:5}} onClick={this.handleEdit}>Submit Changes</Button>
                    </div>
                </Paper>
            </div>
        )
    }
}
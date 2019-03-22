import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Close from '@material-ui/icons/Close'
import Axios from 'axios'

export default class MaterialModal extends Component{
    constructor(props){
        super(props)
        this.state={
            name:``,
            id:``,
            onHand:``,
            orderPoint:``,
            cost:``,
            unit:``
        }
    }

    componentDidMount(){
        this.mapMaterial()
    }

    mapMaterial=()=>{
        this.setState({
            name:this.props.rowData[0],
            id:this.props.rowData[1],
            onHand:this.props.rowData[2],
            orderPoint:this.props.rowData[3],
            cost:this.props.rowData[4],
            unit:this.props.rowData[5]
        })
    }

    handleUserInput=(prop,val)=>{
        this.setState({
            [prop]:val
        })
    }

    handleEdit=()=>{
        const {id, name, onHand, orderPoint, cost, unit} = this.state
        Axios.put(`/api/update/onhand/material/${id}`,{name, onHand, orderPoint, cost, unit})
        .then(() => {
            this.props.refresh()
            this.props.refresh2()
            this.props.closeModal()
            this.props.snackbar('snackbarMessage', `Updated!`)
            this.props.snackbar('snackbar', true)
        })

    }


    render(){

        console.log(this.state)

        return (
            <div style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Paper elevation={1} style={{width:'60vw', height:'auto'}}>
                    <div style={{display:'flex', justifyContent:'space-between', padding:10}}>
                        <Typography variant='h4'>Edit {this.state.name}</Typography>
                        <Button style={{margin:5}} onClick={this.props.closeModal}><Close/></Button>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <TextField margin='normal' label='On Hand' style={{width:'60%'}}
                        onChange={(e)=>this.handleUserInput('onHand',e.target.value)} value={this.state.onHand}/>
                        <TextField margin='normal' label='Order Point' style={{width:'60%'}} value={this.state.orderPoint}
                        onChange={(e)=>this.handleUserInput('orderPoint',e.target.value)}/>
                        <TextField margin='normal' label='Cost Per' style={{width:'60%'}} value={this.state.cost}
                        onChange={(e)=>this.handleUserInput('cost',e.target.value)}/>
                        <TextField margin='normal' label='Unit' style={{width:'60%'}} value={this.state.unit}
                        onChange={(e)=>this.handleUserInput('unit',e.target.value)}/>
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <Button variant='outlined' style={{margin:5}} onClick={this.handleEdit}>Submit Changes</Button>
                    </div>
                </Paper>
            </div>
        )
    }
}
import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Close from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'

export default class CardModal extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }


    render(){
        console.log(this.props)
        let display = null
        if(this.props.data.products){
            display = this.props.data.products.map((product,i) =>{
                const {product_name, product_id, product_on_hand, qty} = product
                return(
                    <div key={i}>
                        <Typography variant='h6'>{product_name}</Typography>
                        <div>
                            <TextField value={product_id} label='Item Number' style={{width:'45%'}}/>
                            <TextField value={product_on_hand} label='Product On Hand' style={{width:'55%'}}/>
                            <TextField value={`${qty}`} label='Quantity Used in Each Product' style={{width:'100%'}}/>
                        </div>
                    </div>
                )
            })
        }else if(!this.props.data.products){
            display = <Typography variant='h5'>No Product Data to Display.</Typography>
        }
        return(
            <div style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Paper elevation={1} style={{width:'60vw', height:'auto'}}>
                    <div style={{display:'flex', justifyContent:'space-between', padding:10, background:'#252525', borderRadius:'4px 4px 0 0'}}>
                        <div style={{color:'white'}}>
                            <Typography variant='h4' style={{color:'white'}}>{this.props.data.name}</Typography>
                            <Typography variant='subheading' style={{color:'white'}}>Component of the Following Products:</Typography>
                        </div>
                        <Button style={{margin:5, color:'white'}} onClick={this.props.closeModal}><Close/></Button>
                    </div>
                    <div style={{padding:10, display:'flex', flexDirection:'column', alignItems:'center'}}>
                        {display}
                    </div>
                </Paper>
            </div>
        )
    }
}
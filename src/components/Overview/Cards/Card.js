import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export default function Cards(props){
    // console.log(props.data)
    const {id, name, uom, on_hand, cost_on_hand, cost_per_uom} = props.data
    //establish variables for additional output fields
    let totalCoH = 0
    let totalCount = 0
    let productCost = 0
    let productCount = 0
    if(props.data.products){
        props.data.products.forEach(product =>{
            const {qty, product_on_hand} = product
            productCount += (qty*product_on_hand)
            productCost += ((qty*product_on_hand)*(cost_per_uom*100)/100)
        })
        totalCount = (productCount+on_hand)
        totalCoH = (((productCost*100)+(cost_on_hand*100))/100)
        console.log('hit', name)
    }else if(!props.data.products){
        totalCoH = cost_on_hand
        totalCount = on_hand
    }

    return(
        <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Card>
                    <div style={{background:'#1EABFF', margin:0, padding:5}}>
                        <Typography variant='h4' style={{color:'white'}}>{name}</Typography>
                    </div>
                <CardContent>
                    <Typography variant='h6'>Item Number: {id}</Typography>
                    <div style={{display:'flex'}}>
                        <TextField variant='outlined' label='Cost on Hand' style={{margin:5}} 
                        value={`$ ${totalCoH}`}/>
                        <TextField variant='outlined' label='On Hand Count'style={{margin:5}} 
                        value={`${totalCount} ${uom}`}/>
                    </div>
                    <div>
                        <TextField value={`In Materials: `} style={{width:'25%'}}/>
                        <TextField value={`$ ${cost_on_hand}`}helperText='Cost' style={{width:'25%'}}/>
                        <TextField value={`${on_hand} ${uom}`}helperText='On Hand' style={{width:'25%'}}/>
                    </div>
                    <div style={{marginTop:5}}>
                        <TextField value={`In Products: `} style={{width:'25%'}}/>
                        <TextField value={`$ ${productCost}`}helperText='Cost' style={{width:'25%'}}/>
                        <TextField value={`${productCount} ${uom}`}helperText='On Hand' style={{width:'25%'}}/>
                    </div>

                </CardContent>
                <CardActions>
                    <Button>
                        See products...
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}
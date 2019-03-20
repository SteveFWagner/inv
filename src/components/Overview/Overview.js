import React, {Component} from 'react'
import Axios from 'axios';
import Typography from '@material-ui/core/Typography'
import KPIContainer from './KPIs/KPIContainer'
import CardsContainer from './Cards/CardsContainer'

class Overview extends Component{
    constructor(props){
        super(props)
        this.state={
            overviewData:[],
            materials:[]
        }
    }

    componentDidMount(){
        this.getOverview()
    }

    getOverview(){
        Axios.get('/api/materials')
        .then(res => {
            this.setState({
                materials:res.data
            })
        })
        Axios.get('/api/overview')
        .then(res => {
            this.setState({
                overviewData:res.data
            })
        })
    }




    render(){
        // console.log('State @ OV',this.state)

        //loop over the materials array 
            //check if any of the overview ids match the materials id
                //if there is a match, check to see if there is an existing array on the material called "products"
                //if no existing "products" array
                    //add a new array to the material called "products"
                    //"products" will contain one object per product the material is in.
        
        let mappedMaterials = this.state.materials.map(material => {
            this.state.overviewData.forEach(data => {
                if(material.id === data.id){
                    if(!material.products){
                        material.products = [{
                            product_id:data.product_id,
                            product_name:data.product_name,
                            product_on_hand:data.product_on_hand,
                            qty:data.qty
                        }]
                    }else if(material.products){
                        material.products = [...material.products, {
                            product_id:data.product_id,
                            product_name:data.product_name,
                            product_on_hand:data.product_on_hand,
                            qty:data.qty
                        }]
                    }
                }
            })
            return material
        })
        return(
            <div>
                <Typography variant='h3'>Overview.</Typography>
                <Typography variant='h5' style={{display:'flex', justifyContent:'center'}}>Key Performance Indicators.</Typography>
                <KPIContainer/>
                <Typography variant='h5' style={{display:'flex', justifyContent:'center', marginTop:20}}>Individual Statistics.</Typography>
                <CardsContainer data={mappedMaterials}/>
            </div>
        )
    }

}
export default Overview


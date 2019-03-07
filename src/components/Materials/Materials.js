import React, {Component} from 'react'
import Axios from 'axios';


class Materials extends Component{
    constructor(props){
        super(props)
        this.state={
            materials:[]
        }
    }
    
    componentDidMount(){
        this.getMaterials()
    }

    getMaterials=()=>{
        Axios.get('/api/materials')
        .then(res => {
            this.setState({
                materials:res.data
            })
        })
    }

    handleCashAdjust(num, num2 = 0){
        let cents = num*100
        let cents2 = num2*100
        num = ((cents+cents2)/100).toLocaleString()
        return num
    }

    render(){
        let mappedMaterials = this.state.materials
        .map(value =>{
            return {...value, name:value.name.toUpperCase()}})
        .map(val => {
            val.cost_per_uom = this.handleCashAdjust(val.cost_per_uom)
            val.cost_on_hand = this.handleCashAdjust(val.cost_on_hand)
            const {id, name, uom, cost_per_uom, on_hand, order_point, cost_on_hand} = val

            return(
                <div key={id} style={{borderRight:'2px grey solid', margin:'5px', padding:'5px'}}>
                    <h3>{name}</h3>
                    <h6>ITEM: 00{id}</h6>
                    <h6>ONHAND: {on_hand}{uom}</h6>
                    <h6>ORDER POINT:{order_point}</h6>
                    <h6>COST: ${cost_per_uom}/{uom}</h6>
                    <h6>COST ON HAND: ${cost_on_hand}</h6>
                </div>
            )
        })

        let totalCost = 0
        const uniqueMaterials = this.state.materials.length

        this.state.materials.forEach(val => {
            let cents = val.cost_on_hand*100
            totalCost += cents 
        })
        totalCost = (totalCost/100).toLocaleString()
        
        return(
            <div>
                <h1>MATERIALS</h1>
                <h4><input placeholder='Search by name...'/></h4>
                <div style={{display:'flex',boxSizing:"border-box"}}>
                    {mappedMaterials}
                </div>
                <div style={{display:'flex', justifyContent:'space-around', borderTop:'2px grey solid', marginTop:'15px'}}>
                    <h4>TOTAL COST ONHAND: ${totalCost}</h4>
                    <h4>UNIQUE MATERIALS: {uniqueMaterials}</h4>
                </div>
            </div>
        )
    }

}
export default Materials
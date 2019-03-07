import React, {Component} from 'react'
import Axios from 'axios';


class Overview extends Component{
    constructor(props){
        super(props)
        this.state={
            overview:[],
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
                overview:res.data
            })
        })
    }

    handleCashAdjust(num, num2 = 0){
        let cents = num*100
        let cents2 = num2*100
        num = ((cents+cents2)/100).toLocaleString()
        return num
    }

    add(num1 = 0, num2 = 0){
        const sum = num1 + num2
        return sum
    }


    render(){
        let mappedOV = this.state.overview.map((val, i, arr) => {
            if(arr[i+1]){
                if(val.material_id === arr[i+1].material_id){
                    val.qty = (arr[i+1].qty + val.qty)
                    arr.splice(arr[i+1],1)
                    console.log('hit', val)
                    return val
                }
            }
            console.log('hit2')
            return val
        }).filter(val => val != null)

        let mappedMaterials = this.state.materials
        .map(value =>{
            return {...value, name:value.name.toUpperCase()}
        })
        .map(matVal => {
            mappedOV.forEach( ovVal => {
                if(matVal.id === ovVal.material_id){
                    console.log('hit', {ovVal})
                    console.log('hit', {matVal})
                    matVal = {...matVal,...ovVal}
                    return matVal
                }
            })
            return matVal
        })
        .map(val => {
            val.cost_per_uom = this.handleCashAdjust(val.cost_per_uom)
            val.cost_on_hand = this.handleCashAdjust(val.cost_on_hand)
            const {id, name, uom, cost_per_uom, on_hand, qty} = val
            const totOnHand = this.add(on_hand, qty)
            const costTot = cost_per_uom * totOnHand
            return(
                <div key={id} style={{borderRight:'2px grey solid', margin:'5px', padding:'5px'}}>
                    <h3>{name}</h3>
                    <h6>ITEM: 00{id}</h6>
                    <h6>COST: ${cost_per_uom}/{uom}</h6>
                    <h6>MATERIAL ONHAND: {on_hand}{uom}</h6>
                    <h6>MATERIAL IN PRODUCT ONHAND: {qty}</h6>
                    <h6>MATERIAL ONHAND TOTAL: {totOnHand}</h6>
                    <h6>COST ON HAND: ${costTot}</h6>
                </div>
            )
        })
        console.log({mappedMaterials})

        return(
            <div>
                <h1>OVERVIEW</h1>
                <h4><input placeholder='Search by name...'/></h4>
                <div style={{display:'flex',boxSizing:"border-box"}}>
                    {mappedMaterials}
                </div>
                <div style={{display:'flex', justifyContent:'space-around', borderTop:'2px grey solid', marginTop:'15px'}}>
                    <h4>DISPLAY KPIs HERE!</h4>
                    
                </div>
            </div>
        )
    }

}
export default Overview
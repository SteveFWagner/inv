import React, {Component} from 'react'
import Axios from 'axios';


class Products extends Component{
    constructor(props){
        super(props)
        this.state={
            products:[]
        }
    }

    componentDidMount(){
        this.getProducts()
    }

    getProducts=()=>{
        Axios.get('/api/products')
        .then(res => {
            this.setState({
                products:res.data
            })
        })
    }

    handleCashAdjust(num, num2 = 0){
        let cents = num*100
        let cents2 = num2*100
        num = ((cents+cents2)/100)
        return num
    }


    render(){
        let combinedProducts = this.state.products.map((val, i, arr) => {
            if(arr[i+1]){
                if(arr[i].product_id === arr[i+1].product_id){
                    val.material_cost = (this.handleCashAdjust(val.material_cost,arr[i+1].material_cost))
                    val.cost_on_hand =(this.handleCashAdjust(val.cost_on_hand,arr[i+1].cost_on_hand))
                    arr.splice(arr[i+1],1)
                    return val
                }else{
                    
                    val.material_cost = (this.handleCashAdjust(val.material_cost))
                    val.cost_on_hand = (this.handleCashAdjust(val.cost_on_hand))
                    return val
                }
            }else{
                val.material_cost = (this.handleCashAdjust(val.material_cost))
                val.cost_on_hand = (this.handleCashAdjust(val.cost_on_hand))
                return val
            }
        }).filter(val => val != null)
        
        const mappedProducts = combinedProducts
        .map(value =>{
            return {...value, product_name:value.product_name.toUpperCase()}})
        .map(val => {
            const {product_id, product_name, material_cost, on_hand, cost_on_hand} = val
            return(
                <div key={product_id} style={{borderRight:'2px grey solid', margin:'5px', padding:'5px'}}>
                    <h3>{product_name}</h3>
                    <h6>ITEM: 00{product_id}</h6>
                    <h6>OHAND: {on_hand}</h6>
                    <h6>COST EACH: ${material_cost}</h6>
                    <h6>COST ONHAND: ${(cost_on_hand).toLocaleString()}</h6>
                </div>
            )
        })

        let totalCost = 0
        
        combinedProducts.forEach(val => {
            let cents = val.cost_on_hand*100
            totalCost += cents
        })
        totalCost = (totalCost/100).toLocaleString()

        const uniqueProducts = this.state.products.length
        
        return(
            <div>
                <h1>PRODUCTS</h1>
                <h4><input placeholder='Search by name...'/></h4>
                <div style={{display:'flex',boxSizing:"border-box"}}>
                    {mappedProducts}
                </div>
                <div style={{display:'flex', justifyContent:'space-around', borderTop:'2px grey solid', marginTop:'15px'}}>
                    <h4>TOTAL COST ONHAND: ${totalCost}</h4>
                    <h4>UNIQUE PRODUCTS: {uniqueProducts}</h4>
                </div>
            </div>
        )
    }

}
export default Products
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



    render(){
        console.log('State @ Products', this.state)
        let combinedProducts = this.state.products.map((val, i, arr) => {
            if(arr[i+1]){
                // console.log('1',arr[i].product_id)
                // console.log('+1',arr[i+1].product_id)
                if(arr[i].product_id === arr[i+1].product_id){
                    console.log(val)
                    let cents = val.material_cost*100
                    let cents2 = arr[i+1].material_cost*100
                    console.log(222,{cents}, {cents2})
                    val.material_cost = ((cents+cents2)/100).toLocaleString()
                    console.log(val.material_cost)
                    // arr.splice(i+1,1)
                    return val
                }
            }else{
                return val
            }
        })

        console.log(combinedProducts)
        // const mappedProducts = this.state.products
        // .map(val => {
        //     const {id, product_name, material_cost, on_hand, cost_on_hand} = this.state.products
        //     return(
        //         <div>

        //         </div>
        //     )
        // })
        return(
            <div>
                Products
                {/* {mappedProducts} */}
            </div>
        )
    }

}
export default Products
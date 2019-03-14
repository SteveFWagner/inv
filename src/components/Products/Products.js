import React, {Component} from 'react'
import Axios from 'axios';
import Typography from '@material-ui/core/Typography'
import ProductDataTable from './ProductDataTable'


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

        return(
            <div>
                <Typography variant='h3'>Products.</Typography>
                <ProductDataTable/>
                <div style={{display:'flex', justifyContent:'space-around', marginTop:'15px'}}>
                    <h4>TOTAL COST ONHAND: ${}</h4>
                    <h4>UNIQUE PRODUCTS: {}</h4>
                </div>
            </div>
        )
    }

}
export default Products
import React, {Component} from 'react'
import Axios from 'axios';
import Typography from '@material-ui/core/Typography'
import ProductDataTable from './ProductDataTable'


class Products extends Component{
    constructor(props){
        super(props)
        this.state={
            // products:[],
            totCostOH:``,
            uniqueMats:``
        }
    }

    componentDidMount(){
        // this.getProducts()
        this.getInfo()
    }

    // getProducts=()=>{
    //     Axios.get('/api/products')
    //     .then(res => {
    //         this.setState({
    //             products:res.data
    //         })
    //     })
    // }

    getInfo=()=>{
        Axios.get('/api/products/totalCost').then(res => this.setState({totCostOH:res.data[0].sum}))
        Axios.get('/api/products/uniqueCount').then(res => this.setState({uniqueMats:res.data[0].count}))
    }

    render(){
        // console.log(this.state)
        return(
            <div>
                <Typography variant='h3'>Products.</Typography>
                <div style={{display:'flex', justifyContent:'space-around', marginTop:'15px'}}>
                    <Typography variant='h6'>TOTAL COST ONHAND: ${Number(this.state.totCostOH).toLocaleString()}</Typography>
                    <Typography variant='h6'>UNIQUE PRODUCTS: {Number(this.state.uniqueMats).toLocaleString()}</Typography>
                </div>
                <ProductDataTable refreshInfo={this.getInfo}/>
            </div>
        )
    }

}
export default Products
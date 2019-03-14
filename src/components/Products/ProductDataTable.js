import React, {Component} from 'react'
import MUIDataTable from 'mui-datatables'
import Axios from 'axios'

export default class ProductDataTable extends Component{
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
        console.log(this.state)
        const columns = [
            {name: "product_name", label: "Name", options: { filter: true, sort: true,}},
            {name: "product_id", label: "Item Number", options: { filter: true, sort: false,}},
            {name: "on_hand", label: "On Hand", options: { filter: true, sort: false,}},
            {name: "material_cost", label: "Cost Per", options: { filter: true, sort: false,}},
            {name: "cost_on_hand", label: "Cost On Hand", options: { filter: true, sort: false,}},
        ]
        const options = {
            filterType: 'dropdown',
        }
        return(
            <MUIDataTable
            data={this.state.products}
            columns={columns}
            options={options}
            />
        )
    }
}
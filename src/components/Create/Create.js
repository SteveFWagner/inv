import React, {Component} from 'react'
import Dropdown from 'react-dropdown'
import Axios from 'axios';
import NewTemplateForm from './NewTemplateForm'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


class Create extends Component{
    constructor(props){
        super(props)
        this.state={
            productTemplates:[],
            materials:[],
            dropdown:``,
            mName:``,
            mOnhand:0,
            mOrderPoint:0,
            mCost:0,
            mUOM:``,
            selectedTemplate:``
        }
    }

    componentDidMount(){
        this.getTemplates()
    }

    getTemplates(){
        Axios.get('/api/templates')
        .then(res => {
            this.setState({
                productTemplates: res.data
            })
        })

    }

    handleDropdown(prop,e){
        this.setState({
            [prop]:e.value
        })
    }

    handleUserInput=(prop,val)=>{
        this.setState({
            [prop]:val
        })
    }

    handleCreateMaterial=()=>{
        //axios POST with mState values
        console.log('hit')
        const {mName:name, mUOM:uom, mCost:cost_per_uom, mOnHand:on_hand, mOrderPoint:order_point} = this.state
        Axios.post('/api/create/material',{name, uom, cost_per_uom, on_hand, order_point})
        .then(res => {
            const {name, id} = res.data[0]
            console.log(res)
            alert(`Success! ${name} created with ITEM#:00${id}`)
        })
        .catch(err => alert('This Material Already Exists.'))
    }

    handleProductDisplay=()=>{
        if(this.state.selectedTemplate === 'NEW PRODUCT'){
            return(
                <>
                    <NewTemplateForm/>
                </>
            )
        }else if(this.state.selectedTemplate){
            let productDetails = []
            let productDetails2 = {}
            this.state.productTemplates.forEach(product => {
                if(product.name.toUpperCase() === this.state.selectedTemplate){
                    productDetails.push(product)
                    const {id, name, on_hand} = product
                    productDetails2 = {id, name, on_hand}

                }
            })
            let materialsUsed = productDetails.map(product => {
                return(
                    <div key={product.material_id}>
                        <li>{(product.material_name).toUpperCase()}: {product.qty}</li>
                    </div>
                )
            })
            return(
                <>
                SELECTED TEMPLATE
                <h3>NAME: {(productDetails2.name).toUpperCase()}</h3>
                <p>ITEM: {productDetails2.id}</p>
                <p>ONHAND: {productDetails2.on_hand}</p>
                <p>MATERIALS NEEDED:</p>
                {materialsUsed}
                <button>CREATE!</button>
                </>
            )
        }
    }

    handleFormDisplay=()=>{
        if(this.state.dropdown === "MATERIALS"){
            return(
                <div style={{width:'80vw'}}>
                    <TextField onChange={(e)=>this.handleUserInput('mName',e.target.value)} 
                    margin='normal' label='Material Name' style={{width:'50%'}}/><br/>
                    <TextField onChange={(e)=>this.handleUserInput('mOnHand',e.target.value)} 
                    margin='normal' label='OnHand' style={{width:'50%'}}/><br/>
                    <TextField onChange={(e)=>this.handleUserInput('mOrderPoint',e.target.value)} 
                    margin='normal' label='Order Point' style={{width:'50%'}}/><br/>
                    <TextField onChange={(e)=>this.handleUserInput('mCost',e.target.value)} 
                    margin='normal' label='Cost' style={{width:'50%'}}/><br/>
                    <TextField onChange={(e)=>this.handleUserInput('mUOM',e.target.value)} 
                    margin='normal' label='Unit of Measurement' style={{width:'50%'}}/><br/>
                    <Button onClick={this.handleCreateMaterial} variant='contained'>Create</Button>
                </div>
            )
        }else if(this.state.dropdown === "PRODUCTS"){
            let productDropdown = ['NEW PRODUCT'] //get the templates from db
            let productNames = []
            this.state.productTemplates.forEach(product =>{
                productNames.push(product.name.toUpperCase())
            })
            productDropdown = [...productDropdown, ...new Set(productNames)]
            let productDisplay = this.handleProductDisplay()
            return(
                <div>

                    <div style={{border:'2px black solid', display:'flex', justifyContent:'space-between', padding:'5px'}}>
                    <Dropdown options={productDropdown} onChange={(e)=>this.handleDropdown('selectedTemplate',e)} 
                    placeholder="SELECT A PRODUCT TO CREATE" value={this.state.selectedTemplate} />
                    <p style={{margin:'0'}}>▼</p>
                    </div>
                    {productDisplay}
                </div>
            )
        }else {
            return null
        }
    }
    
    render(){
        // console.log('State @ Create',this.state)
        const options = ['MATERIALS', 'PRODUCTS']
        let form = this.handleFormDisplay()

        return(
            <div style={{display:'flex', justifyContent:'space-around'}}>
                <div>
                    <h1>CREATE</h1>
                    <div style={{border:'2px black solid', display:'flex', justifyContent:'space-between', padding:'5px'}}>
                    <Dropdown options={options} onChange={(e)=>this.handleDropdown('dropdown',e)} placeholder="SELECT AN OPTION" value={this.state.dropdown} />
                    <p style={{margin:'0'}}>▼</p>
                    </div>
                    {form}
                </div>
            </div>
        )
        
    }

}
export default Create

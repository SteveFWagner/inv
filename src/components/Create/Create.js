import React, {Component} from 'react'
import Axios from 'axios';
import NewTemplateForm from './NewTemplateForm'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'


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

    handleDropdown=(prop,e)=>{
        this.setState({
            [prop]:e.target.value
        })
    }

    handleUserInput=(prop,val)=>{
        this.setState({
            [prop]:val
        })
    }

    handleCreateMaterial=()=>{
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
        if(this.state.selectedTemplate === 'New Product'){
            return(
                <>
                    <NewTemplateForm/>
                </>
            )
        }else if(this.state.selectedTemplate){
            let productDetails = []
            let productDetails2 = {}
            this.state.productTemplates.forEach(product => {
                if(product.name === this.state.selectedTemplate){
                    productDetails.push(product)
                    const {id, name, on_hand} = product
                    productDetails2 = {id, name, on_hand}

                }
            })
            let materialsUsed = productDetails.map(product => {
                return(
                    <div key={product.material_id}>
                        <TextField style={{marginLeft:'5%'}} value={`${product.material_name}: ${product.qty}`}/>
                    </div>
                )
            })
            return(
                <form style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <TextField margin='normal' label='Product Name' style={{width:'50%'}} value={(productDetails2.name)}/>
                <TextField margin='normal' label='Item Number ' style={{width:'50%'}} value={(productDetails2.id)}/>
                <TextField margin='normal' label='On Hand' style={{width:'50%'}} value={(productDetails2.on_hand)}/>
                <TextField margin='normal' style={{width:'50%'}} value="Materials Needed"/>
                {materialsUsed}
                <Button variant='contained' style={{marginTop:5}}>Create</Button>
                {/* finish button onClick */}
                </form>
            )
        }
    }

    handleFormDisplay=()=>{
        if(this.state.dropdown === "Materials"){
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
        }else if(this.state.dropdown === "Products"){
            let productNames = []
            this.state.productTemplates.forEach(product =>{
                productNames.push(product.name)
            })
            const productDropdown = [...new Set(productNames)]
            let count = 0
            let productDropdownDisplay = productDropdown.map(product =>{
                console.log(product)
                count ++
                return(
                    <MenuItem key={count} value={product}>{product}</MenuItem>
                )
            })
            let productDisplay = this.handleProductDisplay()
            return(
                <div>
                    <FormControl style={{width:'100%'}}>
                    <InputLabel>Select A Product To Create</InputLabel>
                    <Select style={{width:'100%'}}  value={this.state.selectedTemplate} 
                    onChange={(e)=>this.handleDropdown('selectedTemplate',e)}>
                        <MenuItem style={{width:100}} value='New Product'>New Product</MenuItem>
                        {productDropdownDisplay}
                    </Select>
                    </FormControl>
                    {productDisplay}
                </div>
            )
        }else {
            return null
        }
    }
    
    render(){
        console.log('State @ Create',this.state)
        let form = this.handleFormDisplay()

        return(
            <div style={{display:'flex', justifyContent:'space-around'}}>
                <div>
                    <h1>CREATE</h1>
                    <form style={{width:'80vw'}}>
                    <FormControl style={{width:'100%'}}>
                    <InputLabel>Select An Option</InputLabel>
                    <Select style={{width:'100%'}} value={this.state.dropdown} 
                    onChange={(e)=>this.handleDropdown('dropdown',e)}>
                        <MenuItem style={{width:100}} value='Materials'>Materials</MenuItem>
                        <MenuItem style={{width:100}} value='Products'>Products</MenuItem>
                    </Select>
                    </FormControl>
                    </form>
                    {form}
                </div>
            </div>
        )
        
    }

}
export default Create

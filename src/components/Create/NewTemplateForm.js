import React, {Component} from 'react'
import Axios from 'axios';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/AddCircleOutline'
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

class newTemplateForm extends Component{
    constructor(props){
        super(props)
        this.state={
            name:``,
            materials:[],
            productName:``,
            templateMaterials:[
                {
                  name:``,
                  qty:``  
                }
            ]
        }
    }

    componentDidMount(){
        this.getMaterials()
    }

    getMaterials(){
        Axios.get('/api/materials')
        .then(res => { this.setState({
            materials:res.data
        })})
    }

    handleProductNameInput=(val)=>{
        this.setState({
            productName:val
        })
    }

    handleSelectMaterialChange=(e,index)=>{
        console.log({e})
        const tempMatsCopy = [...this.state.templateMaterials]
        tempMatsCopy[index] = {...tempMatsCopy[index], name:e.target.value}
        this.setState({
            templateMaterials:tempMatsCopy
        })

    }

    handleAddMaterial=()=>{
        const objBuilder = {
            name:'',
            qty:''
        }
        const stateCopy = this.state.templateMaterials.map(obj => ({...obj}))
        console.log(stateCopy)
        const addBlank = [...stateCopy, {...objBuilder}]
        console.log({addBlank})
        this.setState({
            templateMaterials:addBlank
        })
        
        
    }

    handleRemoveMaterial=()=>{
        if(this.state.additionalMaterialCount > 1){
            this.setState({
                additionalMaterialCount:(this.state.additionalMaterialCount-1)
            })
        }
        
    }


    handleAdditionalMaterials=()=>{
        
            let mappedMaterials = this.state.materials.map(material => {
                const {id, name, uom} = material
                return(
                    <MenuItem key={id} style={{width:100}} value={name}>{(name).toUpperCase()} / {uom}</MenuItem>
                )
            })
            let mappedTemplateMaterials = this.state.templateMaterials.map((material,i) => {
                console.log('hit map')
                return(
                    <div key={i}>
                        <FormControl style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <InputLabel>Material</InputLabel>
                            <Select  style={{width:'50%'}}
                            onChange={(e)=>this.handleSelectMaterialChange(e,i)} value={this.state.templateMaterials[i].name}>
                                {mappedMaterials}
                            </Select>
                            <TextField margin='normal' label='Qty' style={{width:'20%'}}/>
                        </FormControl>
                    </div>
                )
            })
            return mappedTemplateMaterials
        
    }

    render(){
        console.log("State @ NTF",this.state)
        let additionalMaterials = this.handleAdditionalMaterials()
        
        return(
            <div>
                <form style={{width:'80vw'}}>
                    <TextField margin='normal' label='Product Name' style={{width:'50%'}} onChange={(e)=>this.handleProductNameInput(e.target.value)}/><br/>
                        {additionalMaterials}
                </form>
                Add or Remove Materials
                <div style={{display:'flex', padding:5}}>
                    <Button><AddIcon style={{fontSize:20}} onClick={this.handleAddMaterial}/></Button>
                    <Button><RemoveIcon style={{fontSize:20}} onClick={this.handleRemoveMaterial}/></Button>
                </div>
                <Button variant='contained' style={{margin:20}}>Create Template</Button>
            </div>
        )
    }
}
export default newTemplateForm 
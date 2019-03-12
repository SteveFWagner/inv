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
            selectedMaterial:``,
            selectedMaterialUOM:``,
            additionalMaterialCount:1,
            templateMaterials:[]
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

    handleSelectMaterialChange=(e)=>{
        console.log({e})
        this.setState({
            selectedMaterial:e.target.value
        })
        
    }

    handleAddMaterial=()=>{
        this.setState({
            additionalMaterialCount:(this.state.additionalMaterialCount+1)
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
        if(this.state.additionalMaterialCount > 0){
            let mappedMaterials = this.state.materials.map(material => {
                const {id, name, uom} = material
                return(
                    <MenuItem key={id} style={{width:100}} value={name}>{(name).toUpperCase()} / {uom}</MenuItem>
                )
            })
            for(let i = 0;i<=this.state.additionalMaterialCount;i++){
                console.log('hit loop')
                return(
                    <>
                        <FormControl style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <InputLabel>Material</InputLabel>
                            <Select  style={{width:'50%'}}
                            onChange={this.handleSelectMaterialChange} value={this.state.selectedMaterial}>
                                {mappedMaterials}
                            </Select>
                            <TextField margin='normal' label='Qty' style={{width:'20%'}}/>
                        </FormControl>
                    </>
                )
            }
        }
    }

    render(){
        console.log("State @ NTF",this.state)
        let additionalMaterials = this.handleAdditionalMaterials()
        
        return(
            <div>
                <form style={{width:'80vw'}}>
                    <TextField margin='normal' label='Product Name' style={{width:'50%'}}/><br/>
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
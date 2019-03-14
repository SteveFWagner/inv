import React, {Component} from 'react'
import MUIDataTable from 'mui-datatables'
import Axios from 'axios'
import MaterialModal from './MaterialModal'
import Modal from '@material-ui/core/Modal'

export default class MaterialDataTable extends Component{
    constructor(props){
        super(props)
        this.state={
            materials:[],
            modal:false
        }
        this.handleModalOpen=this.handleModalOpen.bind(this)   
    }
        
        componentDidMount(){
            this.getMaterials()
        }
    
        getMaterials=()=>{
            Axios.get('/api/materials')
            .then(res => {
                this.setState({
                    materials:res.data
                })
            })
        }

        handleModalOpen = () => {
            this.setState({ modal: true })
        }
        
        handleModalClose = () => {
            this.setState({ modal: false })
        }

    render(){
        console.log(this.state)
        const columns = [
            {name: "name", label: "Name", options: { filter: true, sort: true,}},
            {name: "id", label: "Item Number", options: { filter: true, sort: false,}},
            {name: "on_hand", label: "On Hand", options: { filter: true, sort: false,}},
            {name: "order_point", label: "Order Point", options: { filter: true, sort: false,}},
            {name: "cost_per_uom", label: "Cost Per", options: { filter: true, sort: false,}},
            {name: "uom", label: "Unit", options: { filter: true, sort: false,}},
            {name: "cost_on_hand", label: "Cost On Hand", options: { filter: true, sort: false,}},
        ]
        const options = {
            filterType: 'dropdown',
            onRowsSelect: function(currentRowsSelected, allRowsSelected){
                console.log({currentRowsSelected})
                console.log({allRowsSelected})
            },
            onRowsDelete: function (rowsDeleted){
                console.log(rowsDeleted)
                
            },
            onRowClick:function(rowData, rowMeta){
                console.log({rowData},{rowMeta})
                // this.handleModalOpen()
            }
        }
        
        return(
            <>
            <MUIDataTable
            data={this.state.materials}
            columns={columns}
            options={options}
            />
            <button onClick={this.handleModalOpen}>Click Me!</button>
            <Modal open={this.state.modal} close={this.handleModalClose}>
                <MaterialModal closeModal={this.handleModalClose}/>
            </Modal>
            </>
        )
    }
}
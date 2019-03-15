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
            modal:false,
            modalData:[]
        }
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

        handleModalOpen = (rowData) => {
            this.setState({ 
                modal: true,
                modalData: rowData 
            })
        }
        
        handleModalClose = () => {
            this.setState({ modal: false })
        }

    render(){
        // console.log(this.state)
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
            onRowsDelete:(rowsDeleted)=>{
                console.log(rowsDeleted)
                alert(
                    `
                    You cannot delete Materials due to dependancies.

                    Please update the onhand as needed.` 
                )
                
            },
            onRowClick: (rowData, rowMeta)=>{
                console.log({rowData},{rowMeta})
                this.handleModalOpen(rowData)
            }
        }
        
        return(
            <>
            <MUIDataTable
            data={this.state.materials}
            columns={columns}
            options={options}
            />
            <Modal open={this.state.modal}>
                <MaterialModal closeModal={this.handleModalClose} rowData={this.state.modalData} refresh={this.getMaterials}/>
            </Modal>
            </>
        )
    }
}
import React, {Component} from 'react'
import MUIDataTable from 'mui-datatables'
import Axios from 'axios'
import MaterialModal from './MaterialModal'
import Modal from '@material-ui/core/Modal'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'

export default class MaterialDataTable extends Component{
    constructor(props){
        super(props)
        this.state={
            materials:[],
            modal:false,
            modalData:[],
            snackbar:false, 
            snackbarMessage:``
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

        handleUserInput=(prop,val)=>{
            this.setState({
                [prop]:val
            })
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
                this.handleUserInput('snackbarMessage', `Cannot Delete Materials Due to Dependancies. Please Update onhand as needed.`)
                this.handleUserInput('snackbar', true)  
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
                <MaterialModal closeModal={this.handleModalClose} rowData={this.state.modalData} 
                refresh={this.getMaterials} refresh2={this.props.refresh2} snackbar={this.handleUserInput}/>
            </Modal>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={this.state.snackbar}
                autoHideDuration={6000}
                onClose={()=>this.handleUserInput('snackbar',false)}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.state.snackbarMessage}</span>}
                action={[
                    <Button key="close" onClick={()=>this.handleUserInput('snackbar',false)} style={{color:'white'}}>
                        <CloseIcon/>
                    </Button>,
                ]}
                />
            </>
        )
    }
}
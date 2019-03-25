import React, {Component} from 'react'
import MUIDataTable from 'mui-datatables'
import Axios from 'axios'
import Modal from '@material-ui/core/Modal'
import ProductModal from './ProductModal'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'

export default class ProductDataTable extends Component{
    constructor(props){
        super(props)
        this.state={
            products:[],
            modal:false,
            modalData:[],
            snackbar:false, 
            snackbarMessage:``
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
            {name: "material_cost", label: "Cost Per", options: { filter: true, sort: false,}},
            {name: "cost_on_hand", label: "Cost On Hand", options: { filter: true, sort: false,}},
        ]
        const options = {
            filterType: 'dropdown',
            onRowsDelete:(rowsDeleted)=>{
                Promise.all(
                    rowsDeleted.data.map(toDelete => {
                        const {id} = this.state.products[toDelete.dataIndex]
                        return Axios.delete(`/api/delete/template/${id}`)
                    })
                ).then(res => {
                    this.handleUserInput('snackbarMessage', 'Product Deleted!')
                    this.handleUserInput('snackbar', true)
                    this.getProducts()
                    this.props.refresh2()
                })
            },
            onRowClick: (rowData, rowMeta)=>{
                // console.log({rowData},{rowMeta})
                this.handleModalOpen(rowData)
            }
        }
        return(
            <>
                <MUIDataTable
                data={this.state.products}
                columns={columns}
                options={options}
                />
                <Modal open={this.state.modal}>
                    <ProductModal closeModal={this.handleModalClose} rowData={this.state.modalData} 
                    refresh={this.getProducts} refresh2={this.props.refresh2} snackbar={this.handleUserInput}/>
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
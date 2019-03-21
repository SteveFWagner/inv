import React, {Component} from 'react'
import Snackbar from '@material-ui/core/Snackbar'

export default class SnackBar extends Component{
    constructor(props){
        super(props)
        this.state={
            open:false
        }
    }

    componentDidMount(){
        console.log('Snack!')
        // this.handleOpen()
    }

    // handleOpen = () => {
    //     this.setState({ open: true });
    //   }
    
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    }
    
    render(){
        console.log(this.props)
        return(
            <div>
                <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.props.open}
                autoHideDuration={3000}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Note archived</span>}
                action={[
                    <button onClick={this.handleClose}>
                    Close
                    </button>,
                ]}
                />
            </div>
        )
    }
}
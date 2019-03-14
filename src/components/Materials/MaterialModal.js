import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

export default function MaterialModal(props){

    return (
        <div onClick={props.closeModal} style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Paper elevation={1} style={{width:'60vw', height:'auto'}}>
                <Typography variant='h4'>Test!</Typography>
            </Paper>
        </div>
    )
}
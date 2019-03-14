import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'
import MaterialDataTable from './MaterialDataTable'


class Materials extends Component{
    constructor(props){
        super(props)
        this.state={
            materials:[]
        }
    }
    


    render(){       
        return(
            <div>
                <Typography variant='h3'>Materials.</Typography>
                    <MaterialDataTable/>
                <div style={{display:'flex', justifyContent:'space-around', marginTop:'15px'}}>
                    <Typography variant='h6'>TOTAL COST ONHAND: ${}</Typography>
                    <Typography variant='h6'>UNIQUE MATERIALS: {}</Typography>
                </div>
            </div>
        )
    }

}
export default Materials
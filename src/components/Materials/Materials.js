import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'
import MaterialDataTable from './MaterialDataTable'
import Axios from 'axios'


class Materials extends Component{
    constructor(props){
        super(props)
        this.state={
            totCostOH:0,
            uniqueMats:0
        }
    }

    componentDidMount(){
        this.getInfo()
    }

    getInfo=()=>{
        Axios.get('/api/materials/totalCost').then(res => this.setState({totCostOH:res.data[0].sum}))
        Axios.get('/api/materials/uniqueCount').then(res => this.setState({uniqueMats:res.data[0].count}))
    }

    render(){
        // console.log(this.state)       
        return(
            <div>
                <Typography variant='h3'>Materials.</Typography>
                <div style={{display:'flex', justifyContent:'space-around', marginTop:'15px'}}>
                    <Typography variant='h6'>TOTAL COST ONHAND: ${Number(this.state.totCostOH).toLocaleString()}</Typography>
                    <Typography variant='h6'>UNIQUE MATERIALS: {Number(this.state.uniqueMats).toLocaleString()}</Typography>
                </div>
                    <MaterialDataTable refresh2={this.getInfo}/>
            </div>
        )
    }

}
export default Materials
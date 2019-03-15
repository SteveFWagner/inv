import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {Pie} from 'react-chartjs-2'

const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

export default class TotalCostPie extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }

    render(){
        return(
            <div>
                <Paper style={{width:150, height:150}}>
                <Pie data={data}/>}
                </Paper>
            </div>
        )
    }
}





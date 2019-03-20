import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {Pie} from 'react-chartjs-2'
import Axios from 'axios'


export default class TotalCostPie extends Component{
    constructor(props){
        super(props)
        this.state={
			materialCost:0,
			productCost:0
        }
	}
	
	componentDidMount(){
		this.getData()
	}

	getData(){
		Axios.get('/api/materials/totalCost')
		.then(res => this.setState({materialCost:res.data[0].sum}))
		Axios.get('/api/products/totalCost')
		.then(res => this.setState({productCost:res.data[0].sum}))
	}



    render(){
		const data = {
			labels: [
				'Products',
				'Materials',
			],
			datasets: [{
				data: [Number(this.state.productCost),Number(this.state.materialCost)],
				backgroundColor: [
				'#7B6F6D',
				'#FF4118'
				],
				hoverBackgroundColor: [
				'#BEB3B0',
				'#FC8E77'
				]
			}]
		};
		// console.log(this.state)
        return(
                <Card style={{minWidth:this.props.size, flex:'0px 0px auto', margin:10}}>
					<CardContent>
						<Typography variant='headline'>
							Cost on Hand.
						</Typography>
						<Pie data={data}/>
					</CardContent>
				</Card>
		)
	}
	
}





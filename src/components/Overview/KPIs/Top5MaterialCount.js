import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Axios from 'axios'
import {Bar} from 'react-chartjs-2'

export default class Top5ProductCost extends Component{
    constructor(props){
        super(props)
        this.state={
            materialData:[]
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData(){
        Axios.get('/api/materials')
        .then(res => this.setState({ materialData: res.data}))
    }

    render(){
        // console.log(this.state)
        let sortedArray = this.state.materialData.sort(
            function(obj1, obj2){ 
                return (Number(obj2.on_hand)/100)-(Number(obj1.on_hand)/100)
            })
        let nameArray = sortedArray.map(material => {
            return material.name
        })
        let countArray = sortedArray.map(material => {
            return material.on_hand
        })  
           
        const data = {
            labels: [nameArray[0], nameArray[1], nameArray[2], nameArray[3], nameArray[4]],
            datasets: [
              {
                label: 'Cost',
                backgroundColor: 'rgba(47, 155, 232,0.2)',
                borderColor: 'rgba(47, 155, 232,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(47, 155, 232,0.4)',
                hoverBorderColor: 'rgba(47, 155, 232,1)',
                data: [countArray[0], countArray[1], countArray[2], countArray[3], countArray[4]]
              }
            ]
          };
        return(
            <Card style={{minWidth:this.props.size, flex:'0px 0px auto', margin:10}}>
                <CardContent>
                    <Typography variant='headline'>
                        Top 5: Materials Count
                    </Typography>
                    <Bar
                    data={data}
                    />
                </CardContent>
            </Card>

        )
    }
}
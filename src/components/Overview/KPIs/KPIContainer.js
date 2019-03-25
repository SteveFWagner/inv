import React, {Component} from 'react'
import TotalCostPie from './TotalCostPie'
import Top5ProductCost from './Top5ProductCost'
import Top5MaterialCost from './Top5MaterialCost'
import Top5ProductCount from './Top5ProductCount'
import Top5MaterialCount from './Top5MaterialCount'

export default class KPIContainer extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            width: 0, 
            height: 0 
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
      }
      
      componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }
    render(){
        // console.log(this.state)
        let size = 350
        if(this.state.width >= 0 && this.state.width <= 949){
            size = 350
        }else if(this.state.width >= 950){
            size = 450
        }

        return(
            <div style={{display:'flex',flexWrap:'nowrap', overflowX:'auto'}}>
                <TotalCostPie size={size}/>
                <Top5ProductCost size={size}/>
                <Top5MaterialCost size={size}/>
                <Top5ProductCount size={size}/>
                <Top5MaterialCount size={size}/>
            </div>
        )
    }
}
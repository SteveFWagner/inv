import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'
import LargePackage from '../../images/LargePackage.png'

export default class About extends Component{
    constructor(props){
        super(props)
        this.state={
            height:0,
            width:0
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
        let displayImage = ``

        if(this.state.width > 730){
            displayImage = <div style={{overflow:'hidden'}}>
                <img src={LargePackage} alt="package logo"/>
            </div>
        }else{
            displayImage = null
        }
        return(
            <div style={{background:'#252525', height:'100%'}}>
                <Typography variant='h3' style={{color:'white'}}>About.</Typography>
                <div style={{margin:"4%", display:'flex', }}>
                    <div style={{display:'flex', flexDirection:'column',color:'white', width:'100%'}}>
                        <Typography variant='h1' style={{color:'white'}}>INV. is...</Typography>
                        <Typography variant='h5' style={{color:'white'}}>Manufacturing inventory made easy.</Typography>
                        <div style={{marginTop:'5%', display:'flex', justifyContent:'space-around', flexWrap:'wrap'}}>
                            <div style={{width:'40%'}}>
                                <Typography variant='h4' style={{color:'white'}}>Materials.</Typography>
                                <Typography variant='body1' style={{color:'white'}}>
                                    <li>Create and modify Materials.</li>
                                    <li>Track their cost, units of measurement and order points.</li>
                                    <li>Create Product Templates from those Materials.</li>
                                </Typography>
                            </div>
                            <div style={{width:'40%'}}>
                                <Typography variant='h4' style={{color:'white'}}>Products.</Typography>
                                <Typography variant='body1' style={{color:'white'}}>
                                <li>Use Templates when products are manufactured to increment the Product count and decrement the Materials count accordingly.</li>
                                <li>Track the Material cost of Creating Products.</li>
                                </Typography>
                            </div>
                            <div style={{width:'40%'}}>
                                <Typography variant='h4' style={{color:'white'}}>Track.</Typography>
                                <Typography variant='body1' style={{color:'white'}}>
                                <li>Full visibilty on Products and Materials from their respective pages.</li>
                                <li>View Combined information and KPIs (Key Performance Indicators) on the Overview page.</li>
                                </Typography>
                            </div>
                        </div>
                    </div>
                    {displayImage}
                </div>
            </div>
        )   
    }
}

 

//Create and modify Materials. Track their cost, units of measurement and order points.
//Create Product Templatess from those Materials.
//Use the Templates when products are manufactured to increment the Product count and decrement the Materials count accordingly.<br/>
//Track the Material cost of Creating Products.
//Full visibilty on Products and Materials from their respective pages.
//View Combined information and KPIs (Key Performance Indicators) on the Overview page.

//           inv.
// Your inventory. Your way.
import React from 'react'
import Grid from '@material-ui/core/Grid'
import TotalCostPie from './TotalCostPie'

export default function KPIContainer(props){
    return(
        <div>
            <Grid container spacing={24} style={{padding:15}}
            direction="row" justify="space-around" alignItems="flex-start">
                <Grid item xs={12} sm={6} lg={4} xl={3} zeroMinWidth>
                    <TotalCostPie/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3} zeroMinWidth>
                    <TotalCostPie/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3} zeroMinWidth>
                    <TotalCostPie/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3} zeroMinWidth>
                    <TotalCostPie/>
                </Grid>
            </Grid>
        </div>
    )
}
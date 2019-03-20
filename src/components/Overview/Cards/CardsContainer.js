import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from './Card'

export default function CardsContainer(props){
    const mappedCards = props.data.map((materialData, i) => {
        return <Card key={i} data={materialData}/>
    })
    return(
        <div>
            <Grid container spacing={24} style={{padding:24}}>
                {mappedCards}
            </Grid>
        </div>
    )
}

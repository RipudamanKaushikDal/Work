// import Card and related modules from material ui
import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia  from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import './Cards.css'


function Cards({data}) {
    return (

        // Define a single reusable Card component
        <div className="card_container">
            <Card className="cards">
                <CardActionArea>
                    <CardMedia 
                    component = "img"
                    height="240"
                    image={data.image}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h3">
                            {data.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {data.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}

export default Cards

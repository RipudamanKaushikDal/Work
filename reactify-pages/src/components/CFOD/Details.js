// import Card and related modules from material ui
import React from 'react'
import Avatar from "@material-ui/core/Avatar"
import './Details.css'


function Details({data}) {
    return (

        // Define a single reusable Details component
        <div className="details_container">

            <Avatar src={data.image}  />

            <div className="text_info">
                <h3>{data.title}</h3>
                <p>{data.description}</p>
            </div>

        </div>
    )
}

export default Details

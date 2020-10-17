import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import StarIcon from '@material-ui/icons/Star';
import './About.css'


function About() {
    return (

        // Define the About Us section with links
        <div className="about">
            <h2>About Us</h2>
            <IconButton style={{alignSelf:"center",width:"40px"}}>
                <StarIcon fontSize="large"/>
            </IconButton>
            <a href="#">Company Info</a>
            <a href="#">Support</a>
            <a href="#">API docs</a>
            <a href="#">Mobile Test</a>
            <a href="#">Back To Top</a>
        </div>
    )
}

export default About

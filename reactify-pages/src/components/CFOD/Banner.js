// Import necessary modules
import React from 'react'
import './Banner.css'
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

function Banner({data}) {

  

    // Library to add auto-carousel effect to banner

    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


    return (

        // Render various banner components with a carousel effect
        <AutoPlaySwipeableViews interval={4000} >
        {data.map(selectedData => (
                <header className="banner" style={{backgroundImage:`url(${selectedData.image})`}} key={selectedData.title}>
                    <div className="banner_contents">
                        <h1 className="banner_title">
                            {selectedData.title}
                        </h1>

                        <div className="banner_description">
                            <h4>{selectedData.description}</h4>
                        </div>

                        <div >
                            <button className="banner_button" >Start Now</button>
                        </div>                
                    </div>
                    <div className="banner--fadebottom"></div>
            </header> 
        

        ))}
        
    </AutoPlaySwipeableViews>
    )
}

export default Banner

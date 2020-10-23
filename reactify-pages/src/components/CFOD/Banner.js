// Import necessary modules
import React from 'react'
import './Banner.css'


function Banner({data}) {

    // Code to choose a random data object from the dummy Static Data everytime it loads
    
    // Create a random integer between 1 and length of data array
    let randomInt = Math.floor(
        Math.random(0,1) * (data.length - 1)
      );

      // Chosen data from the Static data
    const selectedData = data[randomInt]


    return (

        // Render various banner components
        <>
        <header className="banner" style={{backgroundImage:`url(${selectedData.image})`}}>
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
        
        </>
    )
}

export default Banner

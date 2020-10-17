// Import necessary modules and components
import React from 'react';
import Navbar from "./components/CFOD/Navbar"
import Banner from "./components/CFOD/Banner"
import Cards from "./components/CFOD/Cards"
import Welcome from "./components/CFOD/Welcome"
import About from "./components/CFOD/About"
import info from './components/CFOD/StaticData'
import './App.css'


function App() {
  return (

    /* All the components that make up the app are rendered here. The data imported from the Static Data file is passed
    down to the "Banner" component as a prop 'data'. Note that the  "Cards" component is rendered multiple 
    times, to create cards out of our static dummy data. This is how we re-use single component multiple times*/

    <div className="app">
      <Navbar />
      <Banner data = {info} />
      <Welcome />
      <div className="multi_cards">
        {
          info.map((program,index) => (
            <Cards key= {index} data = {program} />
          ))
        }
      </div>
      <About />
     
    </div>
  );
}

export default App;

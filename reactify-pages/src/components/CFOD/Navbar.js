// Import React hooks/functions, icons from material-ui and css file
import React,{useState,useEffect} from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import './Navbar.css'


function NavBar() {

    /*React hook for saving data called 'state' of a component. It returns a variable type and a function type.
    The variable is stored as showNav and function as setShowNav (which is used to set/change the variable). The state 
    is  intialized as false*/
    const [showNav, setShowNav] = useState(false)


    /* React hook to trigger effects when a component mounts, dismounts and updates. We are adding an event listener 
    to display navbar only after we scroll down 100 pixels. When the effect is triggered the showNav value in our 
    state will be set to "true" and we will be able to see the navbar */
    useEffect(() => {
        window.addEventListener("scroll",() => {
            window.scrollY > 100 ? setShowNav(true) : setShowNav(false)
        })
        return () => {
            window.removeEventListener("scroll")
        }
    },[]) /* [] is called dependency array and includes the component to check, for triggers. Empty array means
                the effect will run only once. If not provided, the program will go into infinite loop of renders */

    return (

        // Conditional CSS and component rendering 
        <div className={`navbar ${showNav && "navbar_black"}`}>

            <div className="logo">
             <h1>CFOD</h1>
            </div>

            <div className="nav_icons">
                <Tooltip title="Log In">
                <IconButton >
                    <PersonIcon />
                </IconButton>
                </Tooltip>
                <Tooltip title="Profile">
                <IconButton >
                    <ExitToAppIcon  />
                </IconButton>
                </Tooltip>
                
            </div>
            
        </div>
    )
}

export default NavBar

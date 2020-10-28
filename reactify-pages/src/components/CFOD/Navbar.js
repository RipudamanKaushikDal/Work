// Import React hooks/functions, icons from material-ui and css file
import React,{useState,useEffect} from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import {drawerContents} from './StaticData'
import './Navbar.css'
import SideBar from './SideBar';


function NavBar() {

    /*React hook for saving data called 'state' of a component. It returns a variable type and a function type.
    The variable is stored as showNav and function as setShowNav (which is used to set/change the variable). The state 
    is  intialized as false*/
    const [showNav, setShowNav] = useState(false)

    // Maintain 'state' for leftDrawer, initialized as false
    const [leftDrawer, setLeftDrawer] = useState(false)

    // Maintain 'state' for rightDrawer, intialized as false
    const [rightDrawer, setRightDrawer] = useState(false)


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


    // Function to change the leftDrawer state to false on mouse-over event            
    const changeLeftState = () => {
        if (leftDrawer === true) {
            setLeftDrawer(false)
        }
    }

    // Function to change the rightDrawer state to false on mouse-over event 
    const changeRightState = () => {
        if (rightDrawer === true) {
            setRightDrawer(false)
        }
    }

    return (

        // Conditional CSS and component rendering 
        <div className={`navbar ${showNav && "navbar_black"}`}>

            <div className="logo">
                <Tooltip title="Profile">
                <IconButton onClick={() => setLeftDrawer(true)} onMouseOver={changeLeftState}> 
                    <MenuIcon fontSize="large" />
                </IconButton>
                </Tooltip>
                <h1>CFOD</h1>
            </div>

            {/* Material-UI Icons rendered inside Tooltip component to display help-text on hover*/}

            <div className="nav_icons">
                
                <Tooltip title="Log In">
                <IconButton >
                    <PersonIcon />
                </IconButton>
                </Tooltip>
                <Tooltip title="Dashboard">
                <IconButton onClick={() => setRightDrawer(true)} onMouseOver={changeRightState}>
                    <ExitToAppIcon  />
                </IconButton>
                </Tooltip>
                
                
            </div>

            {/* Render Drawers only when their state is true, both the Drawers are rendered only through a single
            'Sidebar' component */}

            {leftDrawer && <SideBar direction="left" openDrawer={leftDrawer} drawerContents={drawerContents} />}
            {rightDrawer && <SideBar direction="right" openDrawer={rightDrawer} drawerContents={drawerContents} />}
            
        </div>
    )
}

export default NavBar

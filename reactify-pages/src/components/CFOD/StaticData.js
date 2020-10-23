import React from "react"
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';


// Dummy Data for the webpage
// Soon to be replaced by axios

export const data = [
    {
        image:"https://cdn.pling.com/img/d/b/a/4/3296e5dad944d313478fc911c85c192e61eb.jpg",
        title:"Start Now",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    },
    {
        image:"https://surfexpedition.com/wp-content/uploads/2014/04/yoga-pose-for-surfer.jpeg",
        title:"Join The Ceremony in Air",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    },
    {
        image:"https://cdn.pling.com/img/d/b/a/4/3296e5dad944d313478fc911c85c192e61eb.jpg",
        title:"Many in Body One in Mind",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    },
    {
        image:"https://surfexpedition.com/wp-content/uploads/2014/04/yoga-pose-for-surfer.jpeg",
        title:"In Ceaseless Flow of Daimoku",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. "
    }
]


// Data for the menu items

export const drawerContents = [
    {
        header:"Navigation Links",
        subHeader: [
            {
                id:1,
                title:"title1",
                icon: <PersonOutlinedIcon />
            },
            {
                id:2,
                title:"title2",
                icon: <PersonOutlinedIcon />
            },
            {
                id:3,
                title:"title3",
                icon: <PersonOutlinedIcon />
            }

        ]
    },
    {
        header: "About Us",
        subHeader: [
         
            {
                id:1,
                title:"title1",
                icon: <PersonOutlinedIcon />
            },
            {
                id:2,
                title:"title2",
                icon: <PersonOutlinedIcon />
            },
            {
                id:3,
                title:"title3",
                icon: <PersonOutlinedIcon />
            }
        ]
    }
]

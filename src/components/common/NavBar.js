import React from 'react';
import { Link } from 'react-router-dom';



import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

import './NavBar.css';

const NavBar = () => {
    return ( 
        // <AppBar position="static">
        //     <Toolbar>
        //         <Typography variant="title" color="inherit">
        //             Casino
        //         </Typography>
        //     </Toolbar>
        // </AppBar> 
        <div className="nav-sticky-header">
            <div className="header-logo">
                <h2>
                    Tyler Briskie Arcade & Casino
                </h2>
            </div>
            <button>
                Arcade
            </button>
            <button>
                Casino
            </button>
            <Button>
                <Link to="/signup">Signup</Link>
            </Button>
            <Button>
                <Link to="/login">Login</Link>
            </Button>

        </div>
    );
}
 


export default NavBar;
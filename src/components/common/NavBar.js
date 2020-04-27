import React, { useContext, useEffect } from 'react';
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

// LOCAL IMPORTS
import './NavBar.css';
import { ThemeContext } from '../../contexts/themeContext';
import { AuthContext } from '../../contexts/authContext';

const NavBar = (props) => {

    const themeContext = useContext(ThemeContext);
    const { theme } = themeContext;
    const { isAuthenticated, setAuthenticated } = useContext(AuthContext);

    const {
        base,
        accent,
        primary,
        secondary,
        tertiary,
    } = themeContext[theme];

    const logoutUser = () => {
        setAuthenticated({
            isAuthenticated: false,
            token: '',
        })
    }

    return ( 

        <div className="nav-sticky-header" style={{background: base}}>
            <div className="header-logo">
                <h2>
                <Link to="/" style={{color: primary}}>Tyler Briskie Arcade & Casino</Link>
                    
                </h2>
            </div>
            <Button>
                    <Link to="/arcade" style={{color: primary}}>Arcade</Link>
                </Button>
                <Button>
                    <Link to="/casino" style={{color: primary}}>Casino</Link>
                </Button>
            {
                isAuthenticated ?
                (<React.Fragment>
                <Button>
                    <Link to="/account" style={{color: primary}}>Account</Link>
                </Button>
                <Button onClick={logoutUser}>
                    Logout
                </Button>
                </React.Fragment>) :
                (<React.Fragment>
                    <Button>
                        <Link to="/signup" style={{color: primary}}>Signup</Link>
                    </Button>
                    <Button>
                        <Link to="/login" style={{color: primary}}>Login</Link>
                    </Button>
                </React.Fragment>
                )
            }
            

        </div>
    );
}
 


export default NavBar;
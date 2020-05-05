import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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
import HeaderLogo from '../../CasinoHeaderLogo.png';
// import { ThemeContext } from '../../contexts/themeContext';
import { AuthContext } from '../../contexts/authContext';



const NavBar = (props) => {
    const useStyles = makeStyles({
        buttonStyle: {
            color: 'red',
        }
    })
    
    
    const classes = useStyles();
    
    
    // const themeContext = useContext(ThemeContext);
    // const { theme } = themeContext;
    const { isAuthenticated, setAuthenticated } = useContext(AuthContext);

    // const {
    //     base,
    //     accent,
    //     primary,
    //     secondary,
    //     tertiary,
    // } = themeContext[theme];

    const logoutUser = () => {
        setAuthenticated({
            isAuthenticated: false,
            token: '',
        })
    }

    return ( 

        <div className="nav-sticky-header" >
            <div className="header-logo">
                
                <Link to="/" >
                    <img src={HeaderLogo}/>
                </Link>
                    
            </div>
            <div className="nav-button-container">
                    <Button>
                        <Link to="/arcade" >Arcade</Link>
                    </Button>
                    <Button>
                        <Link to="/casino" >Casino</Link>
                    </Button>
                {
                    isAuthenticated ?
                    (<React.Fragment>
                        <Button>
                            <Link to="/account" >Account</Link>
                        </Button>
                        <Button onClick={logoutUser}>
                            Logout
                        </Button>
                    </React.Fragment>) :
                    (<React.Fragment>
                        <Button>
                            <Link to="/signup" >Signup</Link>
                        </Button>
                        <Button>
                            <Link to="/login">Login</Link>
                        </Button>
                    </React.Fragment>
                    )
                }
            </div>

            

        </div>
    );
}
 


export default NavBar;
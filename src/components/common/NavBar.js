import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


// LOCAL IMPORTS
import './NavBar.css';
import HeaderLogo from '../../CasinoHeaderLogo.png';
import { useStore } from "../../contexts/store";

const NavBar = (props) => {
    

    const {state, dispatch} = useStore();


    const logoutUser = () => {
        dispatch({
            type: "USER_LOGOUT",
            isAuthenticated: false,
            token: '',
        })
    }

    return ( 

        <div className="nav-sticky-header" >
            <div className="header-logo">
                
                <Link to="/" >
                    <img src={HeaderLogo} alt="website logo"/>
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
                    state.isAuthenticated ?
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
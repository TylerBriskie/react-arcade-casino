import React, { Component } from 'react';
import { ThemeContext } from '../../contexts/themeContext';
import { AuthContext } from '../../contexts/authContext';

import { Box } from '@material-ui/core';

class AccountSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {  }        
    }

    render() { 
       
        return (
            <AuthContext.Consumer>
                {(authContext) => (
                                               
                    <div>
                        <h1>
                            Account Settings
                        </h1>
        
                        <hr />
                        {/* <h4> theme </h4>
                        <button onClick={() => setTheme('default')}>
                            Default
                        </button>
                        <button onClick={() => setTheme('neonbeach')}>
                            Neon Beach
                        </button> */}
                        {/* <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Box style={{backgroundColor: base, height: "60px", width: "60px"}}>
                    
                            </Box>
                            <Box style={{background: accent, height: "60px", width: "60px"}}>
                            
                            </Box>
                            <Box style={{background: primary, height: "60px", width: "60px"}}>
                            
                            </Box>
                            <Box style={{background: secondary, height: "60px", width: "60px"}}>
                            
                            </Box>
                            <Box style={{background: tertiary, height: "60px", width: "60px"}}>
                            
                            </Box>
                        </div>
                         */}
                    </div>
                
                )}


            </AuthContext.Consumer>
         );
    }
}
 
export default AccountSettings;
import React from 'react';
import { Link } from 'react-router-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Button } from '@material-ui/core';


// CONTEXT

import './GameCard.css';


const GameCard = props => {
   

    let button;
    if (props.active){
        button =  
        <Link to={props.link} >
            <Button variant="contained" color="primary">
                Play
            </Button>
        </Link>
    } else {
        button = <Button >
            Coming Soon
        </Button>
    }

    return ( 
        
        <div className="game-card">
            <div>
                <h3 className="game-card-title">{props.name}</h3>
                <p>{props.description}</p>
                
            </div>

            {button}

        </div>
     );
}
 
export default GameCard;
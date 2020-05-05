import React, {Component} from 'react';


// LOCAL IMPORTS
import Player from '../../common/player/Player';
import './BlackJack.css';



class BlackJack extends Component {
    constructor(props){
        super(props);
    }


    render(){
        return (
            <div className="page-container">
                <h2 className="page-section-header">
                    BLACKJACK GAME
                </h2>
                <div className="players-container">
                <Player />
                <Player />

                <Player />

                <Player />

                </div>

            </div>
        )
    }
}

export default BlackJack
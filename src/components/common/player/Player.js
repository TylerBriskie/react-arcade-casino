import React from 'react';
import Fab from '@material-ui/core/Fab';

// LOCAL
import './Player.css';

const Player = props => {

    const renderButtons = () => {

        const buttons = [];

        if(props.details.hasBlackjack){
            console.log('player ' + props.details.name + ' has blackjack');
            return (
                <div className="player-actions">
                    <h3>Blackjack!</h3>
                </div>
            )
        }

        if (props.details.value > 21){
            console.log('player ' + props.details.seat + ' busts');
            return (
                <div className="player-actions">
                    <h3>Bust!</h3>
                </div>
            )
        }



        return (
            <div className="player-actions">
                {
                   
                }
                <Fab color="primary" aria-label="hit" onClick={props.changeGamePhase("PAYOUT")}>
                    Hit
                </Fab>
                <Fab color="primary" aria-label="stay">
                    Stay
                </Fab>
            </div>
        )
    }

    return ( 
        <div className="individual-player-wrapper">
            <div className="player-details">

            </div>
            <h2>{props.details.name}</h2>
            <div className="cards-container">
                CARDS
            </div>
                {renderButtons()}
                
        </div>
     );
}
 
export default Player;
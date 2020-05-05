import React from 'react';
import Fab from '@material-ui/core/Fab';

// LOCAL
import './BlackjackPlayer.css';

const BlackjackPlayer = props => {


    const doubleDownDisabled = () => {
        console.log(props.details.value);
        if (props.details.value === 9 ||
            props.details.value === 10 ||
            props.details.value === 11
            ){
                return false;
        } else {
            return true;
        }
    }

    const renderCards = () => {


        let useBigCards = props.details.cards.length < 7;

        let cardImgs = props.details.cards.map(c => {
            if (props.details.cards.indexOf(c) === 0){
                return <img className={useBigCards ? 'big-card' : 'small-card'} src={`https://deckofcardsapi.com/static/img/${c}.png`}></img>
            } else {
                return <img className={`${useBigCards ? 'big-card' : 'small-card'} not-first-card`} src={`https://deckofcardsapi.com/static/img/${c}.png`}></img>

            }
        })
        return cardImgs
    }


    // RENDER BUTTONS BASED ON STATE
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
                <Fab color="primary" aria-label="hit" onClick={props.changeGamePhase("PAYOUT")}>
                    Hit
                </Fab>
                <Fab color="primary" aria-label="stay">
                    Stay
                </Fab>
                <Fab color="primary" disabled={ doubleDownDisabled()} aria-label="stay" style={{fontSize:10}}>
                    Double Down
                </Fab>
                <Fab color="primary" disabled={() => doubleDownDisabled} aria-label="stay">
                    Split
                </Fab>
            </div>
        )
    }

    return ( 
        <div className="individual-player-wrapper game-card">
            <div className="player-details">

            </div>
            <h2>{props.details.name}</h2>
            <div className="cards-container">
                {renderCards()}
            </div>
                {renderButtons()}
                
        </div>
     );
}
 
export default BlackjackPlayer;
import React from 'react';

// LOCAL
import './BlackjackDealer.css';
import CardBack from '../../../../playing-card-back-1.png';

const BlackjackDealer = props => {


    const renderDealerCards = () => {

        let cardImgs = props.details.cards.map(c => {
            
                if (props.details.cards.indexOf(c) === 0){
                    if (props.gamePhase !== "DEALER_TURN"){
                        return <img key={c} src={CardBack}></img>
                    } else {
                        return <img key={c} src={`https://deckofcardsapi.com/static/img/${c}.png`}></img>
                    }
                } else {
                    return <img className="not-first-card" key={c} src={`https://deckofcardsapi.com/static/img/${c}.png`}></img>
    
                }

        })
        return cardImgs
    }


    const renderDealerScore = () => {
        if (props.details.value > 21){
            console.log('Dealer Busts');
            return <h3>Dealer Busts!</h3>
        } else {
            return <h3>{props.details.value}</h3>
        }


    }

    if (props.gamePhase === "PLACE_YOUR_BETS"){
        return (<div></div>)
    } else {
        return ( 
            <div id="blackjack-dealer-wrapper">
    
                <h2>DEALER</h2>
                
                <div className="cards-container">
                    {renderDealerCards()}
                </div>
    
                {renderDealerScore()}
    
            </div>
         );
    } 
    
}
 
export default BlackjackDealer;
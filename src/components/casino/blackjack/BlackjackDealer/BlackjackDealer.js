import React from 'react';

// LOCAL
import './BlackjackDealer.css';
import CardBack from '../../../../playing-card-back-1.png';

const BlackjackDealer = props => {


    const renderDealerCards = () => {
        let collapseCards = props.details.cards.length > 6;
        let cardCount = 0;

        let cardImgs = props.details.cards.map(c => {
            if (cardCount === 0 ){
                cardCount++;
                if (props.gamePhase === "PLAYER_TURN" || c === "HIDDEN_CARD"){
                    return <img key={cardCount} src={CardBack} alt="Playing Card back"></img>
                } else {
                    return <img key={cardCount} src={`https://deckofcardsapi.com/static/img/${c}.png` } alt="playing card"></img>
                }
            } else {
                cardCount++;
                if (collapseCards){
                    if (props.details.cards.indexOf(c) < (props.details.cards.length - 4) ){
                        return <img key={cardCount} className="collapsed-card" src={`https://deckofcardsapi.com/static/img/${c}.png` } alt="playing card"></img>
                    } else {
                        return <img key={cardCount} className="not-first-card" src={`https://deckofcardsapi.com/static/img/${c}.png`} alt="playing card"></img>
        
                    }
                } else {
                   
                    return <img key={cardCount} className="not-first-card" src={`https://deckofcardsapi.com/static/img/${c}.png`} alt="playing card"></img>
        
                    
                }
            }
            

        
        })
        // let cardImgs =  props.details.cards.map(c => {
            

        //         if (props.details.cards.indexOf(c) === 0){
        //             if (props.gamePhase === "PLAYER_TURN"){
        //                 return <img key={c} src={CardBack} alt="Playing Card back"></img>
        //             } else {
        //                 return <img key={c} src={`https://deckofcardsapi.com/static/img/${c}.png` } alt="playing card"></img>
        //             }
        //         } else {
        //             return <img className="not-first-card" key={c} src={`https://deckofcardsapi.com/static/img/${c}.png` } alt="playing card"></img>
    
        //         }

        // })
        return cardImgs;
    }


    const renderDealerScore = () => {
        if (props.details.value > 21){
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
        
            </div>
         );
    } 
    
}
 
export default BlackjackDealer;
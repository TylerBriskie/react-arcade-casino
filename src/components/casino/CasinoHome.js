import React from 'react';

// LOCAL IMPORTS
// import './Login.css';
import GameCard from '../common/GameCard';

// CONTEXT


const CasinoHome = () => {



    return ( 
        <div className="page-container">
            <h2 className="page-section-header">Casino</h2>
            <div className="game-list">
                <GameCard className="game-card" name="BlackJack" active={true} description="First to 21 wins! Kind of.  Can YOU beat the dealer in this head to head showdown?" link="/casino/blackjack" />
                <GameCard className="game-card" name="Craps" active={false} description="A complicated game, but Craps offers the best odds in the casino, if you know what you're doing..." link="/casino/craps" />

            </div>
        </div>
     );
}
 
export default CasinoHome;
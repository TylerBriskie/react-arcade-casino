import React, {Component} from 'react';


// LOCAL IMPORTS
import BlackjackPlayer from './BlackjackPlayer/BlackjackPlayer';
import './BlackJack.css';


const PLACE_YOUR_BETS = "PLACE_YOUR_BETS";
const PLAYER_TURNS = "PLAYER_TURNS";
const DEALER_TURNS = "DEALER_TURNS";
const PAYOUT = "PAYOUT";


class BlackJack extends Component {
    constructor(props){
        super(props);
        this.state = {
            players: [{
                seat: 1,
                name: 'Player One',
                credits: 5000,
                cards: ['3S', 'QS'],
                value: 13,
                hasBlackjack: false,
            }, {
                seat: 2,
                name: 'Player Two',
                credits: 5000,
                cards: ['AD', 'KS','9H', '9H', '0S', '0C','9H', '9H', '0S', '0C'],
                value: 11,
                hasBlackjack: false,
            }, {
                seat: 3,
                name: 'Mickey Mouse',
                credits: 100,
                cards: ['3S', 'KD', '2H', '9H', '9H', '0S', ],
                value: 24,
                hasBlackjack: false,
            }],
            dealer: {
                seat: 5,
                cards: [],
                value: 0,
                isBlackjack: false,
            },
            playerTurn: 1,
            gamePhase: PLACE_YOUR_BETS,

        }
    }


    changeGamePhase = async (e) => {
        console.log('changing game phase, ', e.target.value);

        await this.setState({
            gamePhase: e.target.value
        })

        console.log(this.state);

    }

    render(){
        return (
            <div className="page-container">
                <h2 className="page-section-header">
                    BLACKJACK GAME
                </h2>
                <div className="players-container">
                {this.state.players.map(p => 
                    <BlackjackPlayer 
                        details={{...p}} 
                        isPlayerTurn={this.state.playerTurn === p.seat}
                        changeGamePhase={() => this.changeGamePhase}
                    />
                )}

                </div>

            </div>
        )
    }
}

export default BlackJack
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import axios from 'axios';


// LOCAL IMPORTS
import BlackjackPlayer from './BlackjackPlayer/BlackjackPlayer';
import './BlackJack.css';
import BlackjackDealer from './BlackjackDealer/BlackjackDealer';


const PLACE_YOUR_BETS = "PLACE_YOUR_BETS";
const PLAYER_TURN = "PLAYER_TURN";
const DEALER_TURN = "DEALER_TURN";
const PAYOUT = "PAYOUT";


class BlackJack extends Component {
    constructor(props){
        super(props);
        this.state = {
            player: {
                seat: 1,
                name: 'Player One',
                ready: false,
                credits: 5000,
                wager: 0,
                cards: [],
                value: 0,
                hasBlackjack: false,
                canDoubleDown: false,
                canSplit: false,
            },
            dealer: {
                seat: 5,
                cards: [],
                value: 0,
                isBlackjack: false,
            },
            playerTurn: 0,
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


    playerReady = (wager) => {

        let stateCopy = Object.assign({}, this.state);
        let player = stateCopy.player;
        player.ready = true;
        player.wager = wager;
        player.credits = player.credits - wager;
        this.setState({
            player,
        })

        // WHILE GAME IS STILL SINGLE PLAYER ONLY, GO AHEAD AND DEAL CARDS WHEN PLAYER IS READY
        this.dealCards()

    }


    // buildPlayers(){
    //    return this.state.players.map(p => 
    //         <BlackjackPlayer 
    //             key={p.seat}
    //             details={{...p}} 
    //             isPlayerTurn={this.state.playerTurn === p.seat}
    //             gamePhase={this.state.gamePhase}
    //             playerReady={this.playerReady}
    //             requestCard={this.requestCard}
    //             changeGamePhase={() => this.changeGamePhase}
    //         />
    //     )
    // }





    // SEND BETS TO SERVER AND GET INITIAL CARDS
    dealCards() {   


            
        // alert('dealing...')   
        const postData = {
            player: this.state.player,
        };

        console.log(postData);
        axios.post(process.env.REACT_APP_API_BASE_URL+'blackjack/newHand', postData)
        .then((response) => {
            console.log(response.data);
            
            this.setState({
                gamePhase: PLAYER_TURN,
                player: response.data.player,
                dealer: {
                    ...this.state.dealer,
                    cards: response.data.dealer.cards,
                    value: response.data.value
                }
            });
            if (this.state.player.hasBlackjack){
                alert('Blackjack!');
            }
            
        })
        .catch(function (error) {
            console.error(error);
            // TODO: SHOW SNACKBAR
        });

    }


    // REQUEST A CARD
    requestCard = () => {
        const postBody = {
            empty: 'json',
        }
        axios.post(process.env.REACT_APP_API_BASE_URL+'blackjack/hitme', postBody).then((response) => {
            console.log(response.data);
            this.setState({
                player: response.data.player

            });

            if (this.state.player.hasBlackJack || this.state.player.value > 21){
                this.setState({
                    gamePhase: DEALER_TURN
                })
            }


        })

    }



    // RENDER FUNCTION
    render(){

        const GreenButton = withStyles((theme) => ({
            root: {
              color: theme.palette.getContrastText(green[900]),
              backgroundColor: green[500],
              '&:hover': {
                backgroundColor: green[200],
                color: theme.palette.getContrastText(green[200]),

              },
            },
          }))(Button);

        return (
            <div className="page-container">
                <div className="dealer-row">
                    <div className="dealer-container" style={{width: '50%'}}>
                        <BlackjackDealer 
                            details={this.state.dealer}                 
                            gamePhase={this.state.gamePhase}
                            dealerTurn={this.state.playerTurn === 5} 
                        />
                    </div>
                    <div className="game-status" style={{width: '50%'}}>
                         <h2>Player Turn</h2>
                    </div>
                </div>
                <div>
                    <div className="players-container">
                    <BlackjackPlayer 
                        details={{...this.state.player}} 
                        isPlayerTurn={this.state.gamePhase === PLAYER_TURN }
                        gamePhase={this.state.gamePhase}
                        playerReady={this.playerReady}
                        requestCard={this.requestCard}
                        changeGamePhase={() => this.changeGamePhase}
                    />

                    </div>

                </div>

            </div>
        )
    }
}

export default BlackJack
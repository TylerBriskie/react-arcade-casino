import React, {Component, useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import axios from 'axios';


// LOCAL IMPORTS
import BlackjackPlayer from './BlackjackPlayer/BlackjackPlayer';
import './BlackJack.css';
import BlackjackDealer from './BlackjackDealer/BlackjackDealer';
import { useStore } from "../../../contexts/store";


const PLACE_YOUR_BETS = "PLACE_YOUR_BETS";
const PLAYER_TURN = "PLAYER_TURN";
const DEALER_TURN = "DEALER_TURN";
const PAYOUT = "PAYOUT";


const BlackJack = (props) => {
    // GLOBAL STATE
    const {state, dispatch} = useStore();


    // LOCAL STATE
    const [loading, setLoading] = useState(true);
    const [gameMessages, setMessages] = useState([]);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [player, updatePlayer] = useState({
        name: '',
        cards: [],
        value: 0,
        wager: 0,
        credits: 0,
        hasBlackJack: false,
        canSplit: false,
        canDoubleDown: false
    });
    const [dealer, updateDealer] = useState({
        cards: [],
        value: 0,
        hasBlackjack: false,
    })
    const [gamePhase, setGamePhase] = useState(PLACE_YOUR_BETS);

    // USEEFFECT - COMPONENT DID MOUNT
    useEffect(() => {
        console.log('LOADING NEW BLACKJACK GAME');
        console.log(state)
        if (state.token){
            axios.get(process.env.REACT_APP_API_BASE_URL+'users/player-info?id='+ state.id)
                .then(res => {
                    console.log('got player: ', res);
                    updatePlayer( p => ({
                        name: res.data.display_name,
                        credits: res.data.credits,
                        wager: 0,
                        cards: [],
                        value: 0,
                        hasBlackJack: false,
                        canSplit: false,
                        canDoubleDown: false
                    }))
                });
          

            console.log(player);
        }
    }, [])
    
    // PLAYER DID UPDATE
    useEffect(() => {
        console.log('player updated: ', player)
        // PLAYER BUSTS, DEALER TURN
        if (player.value > 21){
            setGamePhase(DEALER_TURN);
        }

        if (player.hasBlackJack){
            alert('blackjack!');
            setGamePhase(DEALER_TURN);
        }
    }, [player])

    // WATCH GAME PHASE
    useEffect(() => {

        if (gamePhase === DEALER_TURN){
            axios.post(process.env.REACT_APP_API_BASE_URL+'blackjack/dealer-turn', {})
                .then(res => {
                    console.log('response from dealer-turn', res);

                }       
            )
        }
    }, [gamePhase]);



    // constructor(props){
    //     super(props);
    //     this.state = {
    //         player: {
    //             seat: 1,
    //             name: 'Player One',
    //             ready: false,
    //             credits: 5000,
    //             wager: 0,
    //             cards: [],
    //             value: 0,
    //             hasBlackjack: false,
    //             canDoubleDown: false,
    //             canSplit: false,
    //         },
    //         dealer: {
    //             seat: 5,
    //             cards: [],
    //             value: 0,
    //             isBlackjack: false,
    //         },
    //         playerTurn: 0,
    //         gamePhase: PLACE_YOUR_BETS,

    //     }
    // }

    const changeGamePhase = (phase) => {
        setGamePhase(phase)
    }

    const setWager = (raise) => {
        if (raise === true){
            if (player.credits >= 25){

                updatePlayer(p => ({
                    ...player,
                    wager: p.wager + 25,
                    credits: p.credits - 25
                }))

            } else {
                setOpen(true);
                setErrorMessage("You do not have enough credits");

            }

        } else {
            if (player.wager > 24){
                updatePlayer(p => ({
                    ...player,
                    wager: p.wager - 25,
                    credits: p.credits + 25
                }))
            } 
        }
    }

    const playerReady = (ready) => {

        // WHILE GAME IS STILL SINGLE PLAYER ONLY, GO AHEAD AND DEAL CARDS WHEN PLAYER IS READY.
        // TODO: WHEN MULTIPLAYER IS IMPLEMENTED, WAIT FOR ALL PLAYERS TO BE READY TO DEAL CARDS
        // useEffect(()=> if (all players ready) dealCards(), [players])
        let copyMessages = [...gameMessages];
        copyMessages.push("Player Bets " + player.wager);
        copyMessages.push("Dealing cards...");
        setMessages(copyMessages);

        dealCards();
        
    }

    // SEND BETS TO SERVER AND GET INITIAL CARDS
    const dealCards = () => {   

        const postData = {
            id: state.id,
            player
        };

        axios.post(process.env.REACT_APP_API_BASE_URL+'blackjack/newHand', postData)
        .then((response) => {
            console.log(response);
            setGamePhase(PLAYER_TURN);
            updatePlayer({
                ...player,
                cards: response.data.player.cards,
                value: response.data.player.value,
                hasBlackJack: response.data.player.hasBlackJack,
                canSplit: response.data.player.canSplit,
                canDoubleDown: response.data.player.canDoubleDown
            });
            updateDealer({
                ...dealer,
                cards: response.data.dealer.cards,
            })
            let copyMessages = [...gameMessages];
            copyMessages.push('Player has ' +  response.data.player.value);
            copyMessages.push('Dealer is showing ' +  response.data.dealer.shown);
            setMessages(copyMessages);

            
        })
        // .catch(function (error) {
        //     console.error(error);
        //     // TODO: SHOW SNACKBAR
        // });
        // console.log(state);
    }


    // REQUEST A CARD
    const requestCard = () => {
        const postBody = {
            id: player.id,
        }
        axios.post(process.env.REACT_APP_API_BASE_URL+'blackjack/hitme', postBody).then(async (response) => {
            console.log(response.data);
 
            updatePlayer({...player, value: response.data.player.value, cards: response.data.player.cards})

        })

    }

    const getGamePhaseString = () => {
        switch (gamePhase){
            case PLACE_YOUR_BETS:
                return "Place Your Bets";
            case PLAYER_TURN:
                return "Player Turn";
            case DEALER_TURN:
                return "Dealer Turn";
            case PAYOUT:
                return "Game Over";
                    
        }
    }


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
            <div className="page-container" id="blackjack-game-container">
                <div className="dealer-row">
                    <div className="dealer-container" style={{width: '50%'}}>
                        <BlackjackDealer 
                            details={dealer}                 
                            gamePhase={gamePhase}
                            dealerTurn={gamePhase === DEALER_TURN} 
                        />
                    </div>
                    <div className="game-status" style={{width: '50%'}}>
                        <h2>{getGamePhaseString()}</h2>
                        <ul>
                            {gameMessages.map((m) => {
                                return <li>
                                    {m}
                                </li>
                            })}
                        </ul>
                      
                    </div>
                </div>
                <div>
                    <div className="players-container">
                    <BlackjackPlayer 
                        details={{...player}} 
                        isPlayerTurn={gamePhase === PLAYER_TURN }
                        gamePhase={gamePhase}
                        playerReady={playerReady}
                        setWager={setWager}
                        requestCard={requestCard}
                        changeGamePhase={changeGamePhase}
                    />

                    </div>

                </div>

            </div>
        )
    }


export default BlackJack
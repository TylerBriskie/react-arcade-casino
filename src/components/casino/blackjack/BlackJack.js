import React, { useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
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
    const {state} = useStore();


    // LOCAL STATE
    const [winner, setWinner] = useState(null);

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

        if (state.token){
            axios.get(process.env.REACT_APP_API_BASE_URL+'users/player-info?id='+ state.id)
                .then(res => {
                    // console.log('got player: ', res);
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
          

            // console.log(player);
        }
    }, [state])
    
    // PLAYER DID UPDATE
    // useEffect(() => {
    //     // PLAYER BUSTS, DEALER TURN
    //     if (player.value > 21){
    //         setGamePhase(DEALER_TURN);
    //     }

    //     if (player.hasBlackJack){
    //         alert('blackjack!');
    //         setGamePhase(DEALER_TURN);
    //     }
    // }, [player])

    // WATCH GAME PHASE
    useEffect(() => {
        if (gamePhase === DEALER_TURN){
            console.log("DEALER TURN")
            dealDealerCards();

        }

        if (gamePhase === PAYOUT){
            axios.get(process.env.REACT_APP_API_BASE_URL+'users/player-info?id='+ state.id)
                .then(res => {
                    // GET NEW CREDIT AMOUNT FROM SERVER, WHERE ITS ALREADY BEEN UPDATED
                    updatePlayer( p => ({
                        ...p,
                        credits: res.data.credits,
                    }))
                });
        }

        if (gamePhase === PLACE_YOUR_BETS){
            setMessages([])

            updatePlayer(oldPlayer => {
                let newPlayer = {...oldPlayer}
                newPlayer.cards = [];
                newPlayer.value = 0;
                
                if (newPlayer.credits - newPlayer.wager > 0){
                    newPlayer.credits -= newPlayer.wager;

                } else {
                    newPlayer.wager = 0;
                }

                return newPlayer
            })

            updateDealer(oldDealer => {
                let newDealer = {...oldDealer}
                newDealer.value = 0;
                newDealer.cards = [];
                return newDealer;
            })

        }

    }, [gamePhase, state.id]);



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

    const dealDealerCards = () => {

        setMessages(oldMessages => {
            return [
                ...oldMessages,
                "Player Turn Over"
            ]
        });


        axios.post(process.env.REACT_APP_API_BASE_URL+'blackjack/dealer-turn', {})
        .then(res => {
            console.log('response from dealer-turn', res);
            // INITIAL DEALER CARD FLIP...
            // REPLACE PLACEHOLDER CARD WITH REAL FIRST CARD

            console.log(res);
            updateDealer( oldDealer => ({
                ...oldDealer,
                value: res.data.dealer.initialScore,
                cards: [res.data.dealer.cards[0], res.data.dealer.cards[1]]
            }))



            setMessages(oldMessages => {
                    let newMessages = [...oldMessages];
                    newMessages.push("Dealer Reveals " + res.data.dealer.revealedCard);
                    newMessages.push("Dealer Has " + res.data.dealer.initialScore);
                    return newMessages
            });

            // DEAL CARDS UNTIL THERE IS A WINNER...
            // ...EXCEPT WE ALREADY KNOW THE RESULT.  WE JUST WANT TO SLOW DOWN THE DEALER
            // SO SHE MOVES AT HUMAN SPEED INSTEAD OF COMPUTER SPEED

            if (res.data.dealer.cards.length < 3){

                setMessages(oldMessages => {
                    let newMessages = [...oldMessages];

                    if (res.data.winner === "DEALER"){
                        newMessages.push('Dealer Wins')
                        setWinner("DEALER")

                    } else if (res.data.winner === "PLAYER"){
                        newMessages.push("Player Wins");
                        setWinner("PLAYER")
    
                    } else if (res.data.winner === "PUSH"){
                        newMessages.push("Player Pushes");
                        setWinner("PUSH")
    
                    }
                    return newMessages
                });

                setGamePhase("PAYOUT")

            } else {

                for (let i = 2; i < res.data.dealer.cards.length; ++i){


                    setTimeout(() => {
    

    
                        // LAST CARD, SHOW WINNER
                        if (i === res.data.dealer.cards.length - 1){


                            setMessages(oldMessages => {
                                let newMessages = [...oldMessages];
                                // REMOVE OLD DEALER HAS MESSAGE
                                newMessages.pop();
                                newMessages.push('Dealer has ' + res.data.dealer.value);
                                if (res.data.winner === "DEALER"){
                                    newMessages.push('Dealer Wins')
                                    setWinner("DEALER")
                                } else if (res.data.winner === "PLAYER"){
                                    newMessages.push("Player Wins");
                                    setWinner("PLAYER")
                                } else if (res.data.winner === "PUSH"){
                                    newMessages.push("Player Pushes");
                                    setWinner("PUSH");
                                }
                                
                                return newMessages
                            })

                            
                            updateDealer(oldDealer => {
                                        
                                    return {
                                        ...oldDealer,
                                        value: res.data.dealer.value > 21 ? "BUST" : res.data.dealer.value,
                                        cards: [...oldDealer.cards, res.data.dealer.cards[i]]
                                    }

                                }
                            )

                            setGamePhase("PAYOUT")

           
                        } else {
                        // SHOW NEW CARD                    

                        updateDealer(oldDealer => {
                                
                                    return {
                                        ...oldDealer,
                                        cards: [...oldDealer.cards, res.data.dealer.cards[i]]
                                    }

                                }
                            )
                        }
    
                    }, 500);
    
    
                }
            }

        }       
    )
    }

    const playerReady = (ready) => {

        // WHILE GAME IS STILL SINGLE PLAYER ONLY, GO AHEAD AND DEAL CARDS WHEN PLAYER IS READY.
        // TODO: WHEN MULTIPLAYER IS IMPLEMENTED, WAIT FOR ALL PLAYERS TO BE READY TO DEAL CARDS
        // useEffect(()=> if (all players ready) dealCards(), [players])

        setMessages(oldMessages => {
            let newMessages = [...oldMessages];
            newMessages.push("Player Bets " + player.wager);
            newMessages.push("Dealing cards...");

            return newMessages
        });

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
                // console.log(response);
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
                    cards: ['HIDDEN_CARD', response.data.dealer.cards],
                })

                setMessages(oldMessages => {
                    let newMessages = [...oldMessages]
                    newMessages.push('Player has ' +  response.data.player.value);
                    newMessages.push('Dealer is showing ' +  response.data.dealer.shown);                    
                    return newMessages;
                });

                
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
            // console.log(response.data);
 
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
            default:
                return "Game Over"
                    
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
                                return <li key={"msg-"+gameMessages.indexOf(m)}>
                                    {m}
                                </li>
                            })}
                        </ul>
                      
                    </div>
                </div>
                <div className="scores-row">
                    <h1>{dealer.value === 0 ? null : dealer.value}</h1>
                    <h1>{player.value === 0 ? null : player.value}</h1>

                </div>
                <div>
                    <div className="players-container">
                    <BlackjackPlayer 
                        details={{...player}} 
                        isPlayerTurn={gamePhase === PLAYER_TURN }
                        winner={winner}
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
import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import Odometer from 'react-odometerjs'
import 'odometer/themes/odometer-theme-default.css'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

// LOCAL
import './BlackjackPlayer.css';
import CardBack from '../../../../playing-card-back-1.png';
import axios from 'axios';

import { useStore } from '../../../../contexts/store';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

const BlackjackPlayer = props => {


    // STYLE OVERRIDES
    const useStyles = makeStyles((theme) => ({
        close: {
            padding: theme.spacing(0.5),
        },
    }));

    // GLOBAL STATE
    const {state, dispatch} = useStore();

    // LOCAL STATE
    const [wager, setWager] = useState(0);
    const [credits, setCredits] = useState(7000);
    // const [open, setOpen] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //       return;
    //     }
    //     setOpen(false);
    //     setErrorMessage('');
    // };

    useEffect(() => {
        setCredits(c => (props.details.credits))
    },[])

    useEffect(() => {
        if (props.gamePhase === "PAYOUT"){
            showWinnings()
        }
    }, [props.gamePhase])


    const doubleDownDisabled = () => {
        // console.log(props.details.value);
        if (props.details.value === 9 ||
            props.details.value === 10 ||
            props.details.value === 11
            ){
                return false;
        } else {
            return true;
        }
    }

    const modifyWager = raise => {
        props.setWager(raise);
    }
    
    const showWinnings = () => {
        let winningsAmt = props.details.wager;
        if (props.details.didDoubleDown){
            winningsAmt *= 2
        }
        if (props.winner === "PLAYER"){
            let el = document.getElementById('credits-winnings')
            el.innerHTML = "+" + winningsAmt*2
        } else if ( props.winner === "PUSH"){
            let el = document.getElementById('credits-winnings')
            el.innerHTML = "+" + winningsAmt
        }

    }


    // LOGIC FOR DISPLAYING PLAYERS CARDS
    const renderCards = () => {

        let collapseCards = props.details.cards.length > 6;
        let cardCount = 0;

        let cardImgs = props.details.cards.map(c => {
            if (cardCount === 0 ){
                cardCount++;
                return <img key={cardCount} src={`https://deckofcardsapi.com/static/img/${c}.png`}></img>

            } else {
                cardCount++;
                if (collapseCards){
                    if (props.details.cards.indexOf(c) < (props.details.cards.length - 4) ){
                        return <img key={cardCount} className="collapsed-card" src={`https://deckofcardsapi.com/static/img/${c}.png`}></img>
                    } else {
                        return <img key={cardCount} className="not-first-card" src={`https://deckofcardsapi.com/static/img/${c}.png`}></img>

                    }
                } else {
                    return <img key={cardCount} className="not-first-card" src={`https://deckofcardsapi.com/static/img/${c}.png`}></img>
                }
            }
            

        
        })
        return cardImgs
    }


    // const renderScore = () => {
    //     if (props.details.value > 21){
    //         console.log('player ' + props.details.seat + ' busts');
    //         return (
    //             <div className="player-actions">
    //                 <h3>Bust!</h3>
    //             </div>
    //         )
    //     } 

    //     return <h3>{props.details.value}</h3>

    // }


    // RENDER BUTTONS BASED ON STATE
    const renderButtons = () => {
        const buttons = [];

        if(props.details.hasBlackjack){
            return (
                <div className="player-actions">
                    <h3>Blackjack!</h3>
                    <Button variant="contained" disabled={props.details.credits < 25 }color="secondary" aria-label="stay" className="player-action-button" onClick={() => props.changeGamePhase("PLACE_YOUR_BETS")}>
                        Deal Again
                    </Button>
                </div>
            )
        }

        if (props.details.value > 21){
            return (
                <div className="player-actions">
                    <h2>BUST</h2>
                    <Button variant="contained" disabled={props.details.credits < 25 }color="secondary" aria-label="stay" className="player-action-button" onClick={() => props.changeGamePhase("PLACE_YOUR_BETS")}>
                        Deal Again
                    </Button>
                </div>
            )
        }

        if (props.gamePhase === "PAYOUT"){
            return (
                <div className="player-actions">
                <h2>{
                    // props.winner === "DEALER" ? "Dealer Wins" : "Player Wins"
                    
                }</h2>
                <Button variant="contained" disabled={props.details.credits < 25 }color="secondary" aria-label="stay" className="player-action-button" onClick={() => props.changeGamePhase("PLACE_YOUR_BETS")}>
                    Deal Again
                </Button>
            </div>
            )
        }

        

        return (
            <div className="player-actions">            
                <Button variant="contained" color="primary" aria-label="hit" className="player-action-button" onClick={() => props.requestCard()}>
                    Hit
                </Button>
                <Button variant="contained" color="primary" aria-label="stay" className="player-action-button" onClick={() => props.endPlayerTurn(props.details)}>
                    Stay
                </Button>
                <Button variant="contained" color="primary" aria-label="stay" className="player-action-button" disabled={!props.details.canDoubleDown} onClick={() => props.doubleDown()} >
                    Double Down
                </Button>
                <Button variant="contained" color="primary" aria-label="stay" className="player-action-button" disabled={!props.details.canSplit}>
                    Split
                </Button>
            </div>
        )
    }


    const classes = useStyles();

    // COMPONENT RETURN METHOD LOGIC
    if (props.gamePhase == "PLACE_YOUR_BETS"){
        return ( 
            <div className="individual-player-wrapper game-card">
                <div className="player-details">
                    <h2>{props.details.name}</h2>
                    <h4>Credits: <Odometer 
                                format=",ddd"
                                duration={500}
                                animation="count"
                                value={props.details.credits}

                            /></h4>
                </div>

                <div>
                    <h4>Current Bet</h4>
                    <div className="place-your-bet-buttons">
                        <Fab color="primary" aria-label="decrease bet" disabled={props.details.ready} onClick={() => modifyWager(false)}><MinusIcon /></Fab>
                        <h2>
                            
                            {props.details.wager}
                        </h2>
                        <Fab color="primary" aria-label="decrease bet" disabled={props.details.ready} onClick={() => modifyWager(true)}><AddIcon /></Fab>
                    </div>
                </div>

                <div>
                    <Button variant="contained" color="primary" style={{width: "100%"}} disabled={props.details.wager === 0} onClick={() => props.playerReady(true)}>PLACE YOUR BET</Button>
                    {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info">
                            {errorMessage}
                        </Alert>
                    </Snackbar> */}
                </div>
            </div>
         );
    } else {
        return ( 
            <div className="row">
                <div>
                    <div className="individual-player-wrapper game-card">
                                
                            
                        <div className="player-details">
                            
                        </div>
                        <h2>{props.details.name}</h2>
                        <h3>
                            <Odometer format="dddd" duration={500} value={props.details.credits}/> credits 
                            <span id="credits-winnings"></span>
                        </h3>
                        <div className="cards-container">
                            {renderCards()}
                        </div>


                            
                    </div>
                </div>


                {renderButtons()}

            </div>

         );
    }
    
}
 


export default BlackjackPlayer;
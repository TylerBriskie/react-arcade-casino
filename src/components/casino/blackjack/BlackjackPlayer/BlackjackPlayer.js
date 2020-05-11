import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

// LOCAL
import './BlackjackPlayer.css';
import CardBack from '../../../../playing-card-back-1.png';


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


    // LOCAL STATE
    const [wager, setWager] = useState(25);
    const [open, setOpen] = useState(false);
  

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };






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

    const modifyWager = raise => {
        if (raise === true){
            setWager(wager + 25)
        } else {
            if (wager > 25){
                setWager(wager - 25);

            } else {
                setOpen(true);
            }
        }
    }
    

    // LOGIC FOR DISPLAYING PLAYERS CARDS
    const renderCards = () => {


        let collapseCards = props.details.cards.length > 6;

        let cardImgs = props.details.cards.map(c => {
            console.log(props.details.cards.length);
            if (collapseCards){
                if (props.details.cards.indexOf(c) === 0 ){
                    return <img src={`https://deckofcardsapi.com/static/img/${c}.png`}></img>
                } else if (props.details.cards.indexOf(c) < (props.details.cards.length - 4) ){
                    return <img className="collapsed-card" src={`https://deckofcardsapi.com/static/img/${c}.png`}></img>
                } else {
                    return <img className="not-first-card" src={`https://deckofcardsapi.com/static/img/${c}.png`}></img>
    
                }
            } else {
                if (props.details.cards.indexOf(c) === 0){
                    return <img src={`https://deckofcardsapi.com/static/img/${c}.png`}></img>
                } else {
                    return <img className="not-first-card" src={`https://deckofcardsapi.com/static/img/${c}.png`}></img>
    
                }
            }

        
        })
        return cardImgs
    }


    const renderScore = () => {
        if (props.details.value > 21){
            console.log('player ' + props.details.seat + ' busts');
            return (
                <div className="player-actions">
                    <h3>Bust!</h3>
                </div>
            )
        } 

        return <h3>{props.details.value}</h3>

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
                </div>
            )
        }



        return (
            <div className="player-actions">            
                <Fab color="primary" aria-label="hit">
                    Hit
                </Fab>
                <Fab color="primary" aria-label="stay" onClick={props.changeGamePhase("DEALER_TURN")}>
                    Stay
                </Fab>

            </div>
        )
    }


    const classes = useStyles();

    // COMPONENT RETURN METHOD LOGIC
    if (props.gamePhase == "PLACE_YOUR_BETS"){
        return ( 
            <div className="individual-player-wrapper game-card">
              
                <h2>{props.details.name}</h2>
                <div className="place-your-bet-buttons">
                    <Fab color="primary" aria-label="decrease bet" disabled={props.details.ready} onClick={() => modifyWager(false)}><MinusIcon /></Fab>
                    <h2>{wager}</h2>
                    <Fab color="primary" aria-label="decrease bet" disabled={props.details.ready} onClick={() => modifyWager(true)}><AddIcon /></Fab>

                </div>
                    <Button variant="contained" color="primary" style={{width: "100%"}}  onClick={() => props.playerReady({seat: props.details.seat, wager})}>PLACE YOUR BET</Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info">
                        Minimum Bet is 25 credits
                        </Alert>
                    </Snackbar>
            </div>
         );
    } else {
        return ( 
            <div className="individual-player-wrapper game-card">
                <div className="player-details">
                    
                </div>
                <h2>{props.details.name} hey</h2>
                    <h3>{props.details.credits} credits</h3>
                <div className="cards-container">
                    {renderCards()}
                </div>
    
                {renderScore()}
    
                {renderButtons()}
                    
            </div>
         );
    }
    
}
 


export default BlackjackPlayer;
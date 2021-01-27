// declaring global variables
var scores, roundScore, activePlayer, gamePlaying, lastDice;// game Playing is state variable;

// initializes the game
init();

document.querySelector('.btn-roll').addEventListener('click', function() {

    //only functions when state of game is true
    if (gamePlaying) {
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'img/dice-' + dice + '.png';

    //3.Update the round score if the rolled number was NOT a 1
    if (dice === 6 && lastDice === 6) {

        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
    }

    else if (dice !== 1) {
        //update round score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }

    else {
        //next player
        nextPlayer();
    }
    lastDice = dice;
}

});

document.querySelector('.btn-hold').addEventListener('click', function() {

    //only functions when state of game is true
    if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // update UI (userinterface)
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // check if player won
    if (scores[activePlayer] >= 100) {

        //set state of game to be false
        gamePlaying = false;

        //display winner
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        //instead of doing this all the time (style) you should create a css class and then add it
        document.querySelector('.dice').style.display = 'none';
        //add 'winner' class to the active player to change the css
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        //remove the 'active' class
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    }

    else {
        //next player
        nextPlayer();
    }
    }
});

//when new button is clicked, initialize function will be called
document.querySelector('.btn-new').addEventListener('click', init);

// initialize function
function init() {

    //setting variables to 0
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    //set state of game to true
    gamePlaying = true;

    //changing the style (css) to display nothing (hide)
    document.querySelector('.dice').style.display = 'none';

    //set the scores to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //resetting the name
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 1';
    //remove 'winner class'
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    //remove 'active class'
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //set first turn to player 1
    document.querySelector('.player-0-panel').classList.add('active');

}

//DRY (DON'T REPEAT YOURSELF)
function nextPlayer() {
    //ternory operator that sets activePlayer
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //reset round score
    roundScore = 0;

    //resets current score
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //toggle allows you to add class 'active' if it is not present, and remove it if it is there
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //hide dice when switching to other player
    document.querySelector('.dice').style.display = 'none';
}








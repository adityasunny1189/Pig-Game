// Declaring variables
var scores = [];
var activePlayer;
var roundScore;
var gamePlaying;
var finalScore;


// Starting point of the code starts with calling the function which works
// on the principle of hoisting
startPoint();


// Dom manipulation of the button whose class is but-rol and it works when
// ever the button for rolling the dice is pressed
document.querySelector(".btn-roll").addEventListener('click', function() {
	if(gamePlaying) {
		// Calling math function to get random values int he given range
		// for our dice to generate random dice no's
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		// Displaying our dice images which was set style none in 
		// the start function section
		document.querySelector("#dice1").style.display = 'block';
		document.querySelector("#dice2").style.display = 'block';
		document.querySelector("#dice1").src = 'dice-' + dice1 + '.png';
		document.querySelector("#dice2").src = 'dice-' + dice2 + '.png';

		// Selecting the value entered in the enter score section
		finalScore = Number(document.querySelector('.win').value);
	

		// Game logic
		if(dice1 === 6 && dice2 === 6) {
			scores[activePlayer] = 0;
			document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
			nextPlayer();
		}
		else if(dice1 > 1 || dice2 > 1) {
			roundScore += dice1 + dice2;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		}
		else {
			nextPlayer();
		}
	}
});


// Dom manipulation for the button btn-new which starts the new game when pressed 
// and also sets everything from starting
document.querySelector(".btn-new").addEventListener('click', function() {
	startPoint();
});


// Dom manipulation for hold button which switches between the players
document.querySelector(".btn-hold").addEventListener("click", function() {
	if(gamePlaying) {
		// Sets the active score to the round score
		scores[activePlayer] += roundScore;
		document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

		// Game logic for deciding winner and then stoping the game
		if(scores[activePlayer] >= finalScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner';
			document.querySelector('#dice1').style.display = "none";
			document.querySelector('#dice2').style.display = "none";
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});


// Function to call next player or switch between the players
function nextPlayer() {
	if(gamePlaying) {
		roundScore = 0;
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		document.querySelector("#current-0").textContent = '0';
		document.querySelector("#current-1").textContent = '0';
		document.querySelector(".player-0-panel").classList.toggle("active");
		document.querySelector(".player-1-panel").classList.toggle("active");
	}
}


// Starting point of the program
function startPoint() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	// Sets every thing on the screen to some default value
	document.querySelector('.win').textContent = 'Win Socre';
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector("#score-0").textContent = '0';
	document.querySelector("#score-1").textContent = '0';
	document.querySelector("#current-0").textContent = '0';
	document.querySelector("#current-1").textContent = '0';
	document.querySelector("#dice1").style.display = "none";
	document.querySelector("#dice2").style.display = "none";
}
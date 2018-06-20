// Format numbers into strings with commas. E.g. 1,000
function moneyFormat(number) {
	var betStr = number.toString();
	var betStr1 = betStr.slice(-9, -6);
	var betStr2 = betStr.slice(-6, -3);
	var betStr3 = betStr.slice(-3);
	if (betStr1 === "") {
		if (betStr2 === "") {
			betStr = betStr3;
		} else {
			betStr = betStr2 + ',' + betStr3;
		}
	} else {
		betStr = betStr1 + ',' + betStr2 + ',' + betStr3;
	} return betStr;
}

var bet = 0;

function betShow() {
	dealButton.removeEventListener('click', start);
	dealButton.src = "pictures/buttons/dealbuttonclickred.png";	
	bet = 0;
	betAmount.textContent = 'BET: ' + moneyFormat(bet);
}

var betAmount = document.getElementById('big');
betAmount.textContent = 'BET: $' + bet;
betAmount.addEventListener('dblclick', betShow);


// Checks for the winner of the round and pays off winnings	
function standFunction() {
	standButton.style.visibility = "hidden";
	hitButton.style.visibility = "hidden";
	setTimeout(function() {
		document.getElementsByClassName('computerCard')[1].src = imgsrc + computer.hand[1] + '.png';
		document.getElementById('computerPoints').style.visibility = "visible";	
	}, 800);

	setTimeout(function() {
		if (checkWinner() === 'player') {
			player.bank += (bet*2);
			bankroll.textContent = 'BANK: $'+ moneyFormat(player.bank);
		} else if (checkWinner() === 'push') {
			player.bank += bet;
			bankroll.textContent = 'BANK: $'+ moneyFormat(player.bank);
		} else if (checkWinner() === 'playerblackjack') {
			player.bank += (bet*2.5);
			bankroll.textContent = 'BANK: $'+ moneyFormat(player.bank);
		}}, 1000);

	setTimeout(function() {
		betButton.style.visibility = "visible";
		dealButton.src = "pictures/buttons/dealbuttonred.png";		
		dealButton.style.visibility = "visible";
		dealButton.removeEventListener('click', start);
		if (player.bank >= bet) {
			dealButton.addEventListener('click', start);
		}}, 1200);
}



// Starting of the round and to restart a new round
function start() {
	var removeComputer = document.getElementsByClassName('computerCard');
	for (var i = removeComputer.length-1; i >= 0; i--) {
		computer.cards.removeChild(removeComputer[i]);
	}

	var removePlayer = document.getElementsByClassName('playerCard');
	for (var i = removePlayer.length-1; i >= 0; i--) {
		player.cards.removeChild(removePlayer[i]);
	}
	player.hand = [];
	computer.hand = [];
	betAmount.textContent = 'BET: $' + moneyFormat(bet);
	betButton.style.visibility = "hidden";
	dealButton.style.visibility = "hidden";
	hitButton.style.visibility = "visible";
	standButton.style.visibility = "visible";
	document.getElementById('playerPoints').style.visibility = "visible";
	betAmount.removeEventListener('dblclick', betShow);
	document.getElementById('chips').style.visibility = "hidden";
	player.bank -= bet;
	bankroll.textContent = 'BANK: $'+ moneyFormat(player.bank);
	computer.deal();
	player.deal();
	document.getElementsByClassName('computerCard')[1].src = "pictures/card-back.png";
	document.getElementById('computerPoints').style.visibility = "hidden";
}


// Incredibly long if/else function for checking the winner of the round
function checkWinner() {
	if (checkBlackjack(player.hand) && checkBlackjack(computer.hand)) {
		big.textContent = 'PUSH';
		return 'push';
	} else if (checkBlackjack(player.hand)) {
		big.textContent = (player.name + ' BLACKJACK').toUpperCase();
		return 'playerblackjack';
	} else if (checkBlackjack(computer.hand)) {
		big.textContent = (computer.name + ' BLACKJACK').toUpperCase();
		return 'computerblackjack';	
	} else if (totalValue(player.hand) > 21) {
		big.textContent = (player.name + ' BUST').toUpperCase();
		return 'computer';
	} else if (totalValue(player.hand) <= 21) {
		while (totalValue(computer.hand) < 17) {
			computer.hit();
		}
		for (var i = 0; i < computer.hand.length; i++) {
			if ((totalValue(computer.hand) == 17) && (aceCheck(computer.hand[i]))) {
				while (totalValue(computer.hand) <= 17) {
					computer.hit();
				}
			}
		}
		if (totalValue(computer.hand) > 21) {
			big.textContent = (computer.name + ' BUST').toUpperCase();
			return 'player';
		}
		if (totalValue(computer.hand) <= 21) {
			if (totalValue(player.hand) > totalValue(computer.hand)) {
				big.textContent = (player.name + ' WINS!').toUpperCase();
				return 'player';
			} else if (totalValue(computer.hand) > totalValue(player.hand)) {
				big.textContent = (computer.name + ' WINS!').toUpperCase();
				return 'computer';
			} else {
				big.textContent = 'PUSH!';
				return 'push';
			}
		}
		
	}
}



// Deal cards to the referenced object
function deal() {
	this.hand.push(deck.pop());
	this.hand.push(deck.pop());
	let card1 = this.hand[0];
	let card2 = this.hand[1];

	let cardImage1 = document.createElement('img');
	cardImage1.classList.add(this.cardId);
	cardImage1.src = imgsrc + card1 + '.png';
	cardImage1.style.height = '200px';
	let cardImage2 = document.createElement('img');
	cardImage2.classList.add(this.cardId);
	cardImage2.src = imgsrc + card2 + '.png';
	cardImage2.style.height = '200px';
	this.cards.appendChild(cardImage1);
	this.cards.appendChild(cardImage2);
	this.total.textContent = totalValue(this.hand);
	if (checkBlackjack(this.hand)) {
		setTimeout(standFunction,500);
	}

}


// Check if the hand has Blackjack
function checkBlackjack(hand) {
	if (totalValue(hand) == 21 && hand.length == 2) {
		return true;
	} else {
		return false;
	}
}


// Take another card
function hit() {
	this.hand.push(deck.pop());
	let card = this.hand[this.hand.length - 1];
	let cardImage = document.createElement('img');
	cardImage.classList.add(this.cardId);
	cardImage.src = imgsrc + card + '.png';
	cardImage.style.height = '200px';
	this.cards.appendChild(cardImage);
	this.total.textContent = totalValue(this.hand);
	if (totalValue(this.hand) > 21) {
		standFunction();
	}
}


// Check if the selected card is an Ace
function aceCheck(card) {
	var x = false;
	if (cardValue(card) == 11) {
			x = true;
		} return x;
}


// Total value of a hand
function totalValue(array) {
	var val = 0;
	for (var i = 0; i < array.length; i++) {	
		val += cardValue(array[i]);
	}
	for (var a = 0; a < array.length; a++) {
		if (val > 21 && aceCheck(array[a])) {
			val -= 10;
	}
	} return val;
}


// Value of an individual card
function cardValue(foo) {
	if (foo.length == 2 && foo[0] == 1) {
		return 11;
	} else if (foo.length == 3) {
		return 10;
	} else {
		return parseInt(foo[0]);
	}
}

// Player object
var player = {
	name: 'Player',
	hand: [],
	bank: 100000,
	cardId: 'playerCard',
	cards: document.getElementById('playerHand'),
	total: document.getElementById('playerValue'),
	deal: deal,
	hit: hit,
};

// AI object
var computer = {
	name: 'Dealer',
	hand: [],
	cardId: 'computerCard',
	cards: document.getElementById('computerHand'),
	total: document.getElementById('computerValue'),
	deal: deal,
	hit: hit,
};

// Player's bankroll
var bankroll = document.getElementById('bank');
bankroll.textContent = 'BANK: $'+ moneyFormat(player.bank);

// Directory for images of cards
imgsrc = 'pictures/cards/';

// Selector for main title
var big = document.getElementById('big');


// Making the deck of cards
var deck = [];
for(var i = 1; i <= 13; i++) {
	deck.push(i + 'D');
	deck.push(i + 'C');
	deck.push(i + 'H');
	deck.push(i + 'S');
	deck.push(i + 'D');
	deck.push(i + 'C');
	deck.push(i + 'H');
	deck.push(i + 'S');
	deck.push(i + 'D');
	deck.push(i + 'C');
	deck.push(i + 'H');
	deck.push(i + 'S');
	deck.push(i + 'D');
	deck.push(i + 'C');
	deck.push(i + 'H');
	deck.push(i + 'S');
	shuffle(deck);
	deck.push(i + 'D');
	deck.push(i + 'C');
	deck.push(i + 'H');
	deck.push(i + 'S');
	deck.push(i + 'D');
	deck.push(i + 'C');
	deck.push(i + 'H');
	deck.push(i + 'S');
	deck.push(i + 'D');
	deck.push(i + 'C');
	deck.push(i + 'H');
	deck.push(i + 'S');
	deck.push(i + 'D');
	deck.push(i + 'C');
	deck.push(i + 'H');
	deck.push(i + 'S');	
	shuffle(deck);
}



// Function to shuffle the cards
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
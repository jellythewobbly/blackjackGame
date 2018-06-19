// Stand Button
var standButton = document.getElementById('stand');
standButton.addEventListener('click', standFunction);

standButton.onmousedown = function() {
	standButton.src = "pictures/buttons/standbuttonclickred.png";
};
standButton.onmouseup = function() {
	standButton.src = "pictures/buttons/standbuttonred.png";
};



// Hit Button
var hitButton = document.getElementById('hit');
hitButton.addEventListener('click', function() {
	player.hit();
});

hitButton.onmousedown = function() {
	hitButton.src = "pictures/buttons/hitbuttonclickred.png";
};
hitButton.onmouseup = function() {
	hitButton.src = "pictures/buttons/hitbuttonred.png";
};



// Deal Button
var dealButton = document.getElementById('deal');
dealButton.onmousedown = function() {
	dealButton.src = "pictures/buttons/dealbuttonclickred.png";
};



// Bet Button
var betButton = document.getElementById('bet');
betButton.onmousedown = function() {
	betButton.src = "pictures/buttons/betbuttonclick.png";
};

betButton.onmouseup = function() {
	betButton.src = "pictures/buttons/betbutton.png";
};

betButton.addEventListener('click', function() {
	document.getElementById('chips').style.visibility = "visible";
	bet = 0;
	betAmount.textContent = 'BET: $' + moneyFormat(bet);
	betAmount.addEventListener('dblclick', betShow);
	var removeComputer = document.getElementsByClassName('computerCard');
	for (var i = removeComputer.length-1; i >= 0; i--) {
		computer.cards.removeChild(removeComputer[i]);
	};

	var removePlayer = document.getElementsByClassName('playerCard');
	for (var i = removePlayer.length-1; i >= 0; i--) {
		player.cards.removeChild(removePlayer[i]);
	};
	document.getElementById('computerPoints').style.visibility = "hidden";
	document.getElementById('playerPoints').style.visibility = "hidden";

});
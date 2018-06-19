var greenChip = document.getElementById('green');
greenChip.addEventListener('click', function() {
	if (player.bank >= bet + 100) {
		bet += 100;
	};	
	big.textContent = 'BET: $' + moneyFormat(bet);
	if (bet > 0) {
		dealButton.addEventListener('click', start);
	};
	dealButton.src = "pictures/buttons/dealbuttonred.png";
});


var orangeChip = document.getElementById('orange');
orangeChip.addEventListener('click', function() {
	if (player.bank >= bet + 500) {
		bet += 500;
	};
	big.textContent = 'BET: $' + moneyFormat(bet);
	if (bet > 0) {
		dealButton.addEventListener('click', start);
	};
	dealButton.src = "pictures/buttons/dealbuttonred.png";
});


var blueChip = document.getElementById('blue');
blueChip.addEventListener('click', function() {
	if (player.bank >= bet + 1000) {
		bet += 1000;
	};	
	big.textContent = 'BET: $' + moneyFormat(bet);
	if (bet > 0) {
		dealButton.addEventListener('click', start);
	};
	dealButton.src = "pictures/buttons/dealbuttonred.png";
});


var redChip = document.getElementById('red');
redChip.addEventListener('click', function() {
	if (player.bank >= bet + 5000) {
		bet += 5000;
	};	
	big.textContent = 'BET: $' + moneyFormat(bet);
	if (bet > 0) {
		dealButton.addEventListener('click', start);
	};
	dealButton.src = "pictures/buttons/dealbuttonred.png";
});


var blackChip = document.getElementById('black');
blackChip.addEventListener('click', function() {
	if (player.bank >= bet + 10000) {
		bet += 10000;
	};	
	big.textContent = 'BET: $' + moneyFormat(bet);
	if (bet > 0) {
		dealButton.addEventListener('click', start);
	};
	dealButton.src = "pictures/buttons/dealbuttonred.png";
});

var allChips = document.getElementById('chips');
allChips.addEventListener('mouseover', function() {
	if (player.bank < 100) {
		alert('YOU ARE BROKE, GOODBYE!');
	};
});

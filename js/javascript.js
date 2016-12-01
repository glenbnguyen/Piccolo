var gengar = { // Variable to hold Gengar's information
	name: "Gengar", 
	health: 100,
	lvl: 6,
	effect: null,
	moves: [{ //moves Dictionary
		name: "Night Shade",
		type: "Attack",
		power: 40,
		accuracy: .75

	},
	{
		name: "Lick",
		type: "Attack",
		power: 10,
		accuracy: .90

	}, 
	{
		name: "Nightmare",
		type: "Defense",
		power: .20,
		accuracy: .80
	}, 
	{
		name: "Curse",
		type: "Defense",
		power: .60,
		accuracy: .60
	}, ]


};

var pikachu = { //enemy variable
	name: "Pikachu", 
	health: 100,
	lvl: 5,
	effect: null,
	moves: [{ // set enemy moves dictionary
		name: "Thundershock",
		type: "Attack",
		power: 20,
		accuracy: .75

	},
	{
		name: "Thunderbolt",
		type: "Attack",
		power: 40,
		accuracy: .50

	}, 
	{
		name: "Tail whip",
		type: "Defense",
		power: .20,
		accuracy: 1.0
	}, 
	{
		name: "Agility",
		type: "Defense",
		power: .50,
		accuracy: .50
	}]

};

var currentState; //Current state of the game
var cpuPokemon; // Variable that holds CPU information
var userPokemon; // Variable that holds User information

var cpuTurn = { //Variable that holds CPU's turn information
	play: function() { 
		var randomMove = Math.floor(Math.random() * 4); // randomMove variable using Math.random function * 4 and then rounded with Math.floor function
		var currentCPUMove = cpuPokemon.moves[randomMove]; // currentCPUMove holds the computer's values of the CPU moves and selects a random move from the 4 possible moves via previous randomMove variable. 

		var setUpCPUField = function() {
			$("#chat-text").text("What will " + cpuPokemon.name + " do?");
			prepareToAttack();
		};

		var prepareToAttack = function () {
			$("#pikachu-img").animate({
				top: "-=25", 
			}, 200, function(){
				$("#pikachu-img").animate({
					top: "+=25",
				}, 200)
			
			});
			getAccuracy();
		};

		var getAccuracy = function (){
			var setAccuracy = Math.random();
			if (setAccuracy <= currentCPUMove.accuracy) {
				$("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + "!");
				getMoveType();
			} else {
				$("#chat-text").text(cpuPokemon.name + " missed with " + currentCPUMove.name + "!");
				currentState = playerTurn;
				setTimeout(loop, 1500)
			} 

		};

		var getMoveType = function () {
			showMoveAnimation();

			if (currentCPUMove.type == "Attack") {
				setTimeout(attackingMove, 1500); 
			} else {
				setTimeout(defensiveMove, 1500);
			}
		};

		var showMoveAnimation = function() {
			$("#attack-img").addClass("cpu-attack-img");
			$("#attack-img").removeClass("hide");
			$("#attack-img").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
		};

		var attackingMove = function () {
			$("#attack-img").addClass("hide");
			$("#attack-img").removeClass("cpu-attack-img");
			if (!cpuPokemon.effect) {
				userPokemon.health -= currentCPUMove.power;
			} else {
				userPokemon.health -= (currentCPUMove.power) - (currentCPUMove.power * cpuPokemon.effect);
				cpuPokemon.effect = null;

			}
			$("#user-health-bar").css("width", userPokemon.health + "%");
			currentState = playerTurn;
			loop();
			
		};

		var defensiveMove = function () {
			$("#defense-img").addClass("hide");
			$("#defense-img").removeClass("cpu-attack-img");
			userPokemon.effect = currentCPUMove.power;
			currentState = playerTurn;

		};

		setUpCPUField();
	}
};

var playerTurn = {
	play: function() {
		var currentUserMove;

		var setUpUserField = function () {
			var moveButtons = ["#move1-text","#move2-text","#move3-text","#move4-text"];

			$("#user-buttons").removeClass("hide");
			$("#chat-text").text("What will " + userPokemon.name + " do?");

			for (var i = moveButtons.length - 1; i >=0; i--) {
				$(moveButtons[i]).text(userPokemon.moves[i].name);
			
		};
	};

	var prepareToAttack = function () {
		$("#user-buttons").addClass("hide");
		$("#gengar-img").animate({
				top: "-=25", 
			}, 200, function(){
				$("#gengar-img").animate({
					top: "+=25",
				}, 200)
			
			});
		getAccuracy();
	};

	var getAccuracy = function (){
		var setAccuracy = Math.random();
		if (setAccuracy <= currentUserMove.accuracy) {
			$("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + "!");
			getMoveType();
		} else {
			$("#chat-text").text(userPokemon.name + " missed with " + currentUserMove.name + "!");
			currentState = cpuTurn;
			setTimeout(loop, 1500)
			} 

		};


	var getMoveType = function () {
		showMoveAnimation();

		if (currentUserMove.type == "Attack") {
			setTimeout(attackingMove, 1500); 
		} else {
			setTimeout(defensiveMove, 1500);
		}
	};

	var showMoveAnimation = function() {
			$("#attack-img").addClass("user-attack-img");
			$("#attack-img").removeClass("hide");
			$("#attack-img").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
		};


		var attackingMove = function () {
			$("#attack-img").addClass("hide");
			$("#attack-img").removeClass("user-attack-img");
			if (!cpuPokemon.effect) {
				cpuPokemon.health -= currentUserMove.power;
			} else {
				cpuPokemon.health -= (currentUserMove.power) - (currentUserMove.power * cpuPokemon.effect);
				userPokemon.effect = null;

			}
			$("#cpu-health-bar").css("width", cpuPokemon.health + "%");
			currentState = cpuTurn;
			loop();
			
		};		

		var defensiveMove = function () {
			$("#defense-img").addClass("hide");
			$("#defense-img").removeClass("user-attack-img");
			cpuPokemon.effect = currentUserMove.power;
			currentState = cpuTurn;

		};		

	$("#move1-button, #move2-button, #move3-button, #move4-button").unbind().click(function () {
		var move = $(this).attr("value");
		
		currentUserMove = userPokemon.moves[move];
		prepareToAttack();

	});

	setUpUserField();
	}
};

var loop = function () {
	if (cpuPokemon.health <=0 || userPokemon.health <=0) {
		$("#game-over").removeClass("hide");
		console.log("Game Over");
	} else {
		currentState.play();
	
	}
};

var init = function() {
	cpuPokemon = pikachu;
	userPokemon = gengar;
	$("#cpu-name").text(cpuPokemon.name);
	$("#cpu-lvl").text("Lv " + cpuPokemon.lvl);
	$("#user-name").text(userPokemon.name);
	$("#user-lvl").text("Lv " + userPokemon.lvl);
	currentState = playerTurn;
	loop();
};

init();

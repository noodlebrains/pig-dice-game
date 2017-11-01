function coinToss(pigDice){
  var toss = Math.random();
  if (toss > 0.5) {
    pigDice.turn = 'player1';
  } else {
    pigDice.turn = 'player2';
  }
  return pigDice;
}

function rollDice(pigDice){
  pigDice.roll = Math.floor(Math.random() * 6) + 1; // (0 - 0.9999999) * 6
  return pigDice;
}

function Player(playerName){
  this.name = playerName;
  this.score = 0;
}

function endTurn(pigDice){
  if (pigDice.turn === 'player1'){
    pigDice.turn = 'player2';
  } else {
    pigDice.turn = 'player1';
  }
  return pigDice;
}

function playGame(pigDice, clickedRollOrHold){
  if (clickedRollOrHold === 'roll') {
    pigDice = rollDice(pigDice);
    if (pigDice.roll > 1) {
      pigDice.tempScore += pigDice.roll;
    } else {
      pigDice.tempScore = 0;
      pigDice = endTurn(pigDice);
    }
  }
  if (clickedRollOrHold === 'hold') {
    var currPlayer = pigDice.turn;
    pigDice[currPlayer].score += pigDice.tempScore;
    pigDice.tempScore = 0;
    pigDice = endTurn(pigDice);
    console.log(pigDice);
    console.log(pigDice[currPlayer].score);
  }
  return pigDice;
}

// FRONT END

$(function(){
  var pigDice = {};
  var clickedRollOrHold;
  $("button#play-button").click(function(){
    pigDice = {};
    var player1Name = $("#player-1-name-input").val();
    var player2Name = $("#player-2-name-input").val();
    $('span#player-1-name-span').text(player1Name);
    $('span#player-2-name-span').text(player2Name);
    pigDice.player1 = new Player(player1Name);
    pigDice.player2 = new Player(player2Name);
    pigDice.roll = 0;
    pigDice.tempScore = 0;
    coinToss(pigDice);
    var currPlayer = pigDice.turn;
    $('#current-player-span').text(pigDice[currPlayer].name);
    $(".to-show").show();
    $(".to-hide").hide();
  });
  $("button#roll-button").click(function(){
    clickedRollOrHold = 'roll';
    pigDice = playGame(pigDice, clickedRollOrHold);
    $('#player-1-score-span').text(pigDice.player1.score);
    $('#player-2-score-span').text(pigDice.player2.score);
    $('#temp-score-span').text(pigDice.tempScore);
    var currPlayer = pigDice.turn;
    $('#current-player-span').text(pigDice[currPlayer].name);
    $('#current-roll-span').text(pigDice.roll);
  });
  $("button#hold-button").click(function(){
    clickedRollOrHold = 'hold';
    pigDice = playGame(pigDice, clickedRollOrHold);
    $('#player-1-score-span').text(pigDice.player1.score);
    $('#player-2-score-span').text(pigDice.player2.score);
    $('#temp-score-span').text(pigDice.tempScore);
    var currPlayer = pigDice.turn;
    $('#current-player-span').text(pigDice[currPlayer].name);
    $('#current-roll-span').text(pigDice.roll);
  });
});

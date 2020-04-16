var initScoreSettings;
var initTurnSettings;
var initPlayersSettings;

var turn;
var players;

var $error = $("#error");
var $info = $("#info");

$("#game-page").hide();
$("#start").click(function() { start(); });
$("#new").click(function() { newGame(); });
$("#reset").click(function() { reset(); });
$("#score-submit").click(function() { nextTurn(); });

function start() {
  initScoreSettings = $("#game-settings input[name=\"game\"]").val() * 1;
  initTurnSettings = {throws: 0, score: 0};
  initPlayersSettings = [];
  var i = 0;
  $("#game-settings input[name=\"player\"]").each(function() {
    var playerName = $(this).val().trim();
    if(playerName.length > 0) {
      initPlayersSettings.push({name: playerName, score: initScoreSettings, turn: i == 0});
      i++;
    }
  });

  turn = { ...initTurnSettings};
  players = initPlayersSettings.map(function(player){ return {...player}; });

  $("#game-type").text(initScoreSettings);
  initPlayers($("#players"), players);
  initScoreOptions($("#score-options"));

  $("#main-page").hide();
  $("#game-page").show();
  refresh();
}

function newGame() {
  $("#game-page").hide();
  $("#main-page").show();
}

function refresh() {
  $error.empty();
  $info.empty();
  refreshPlayers($("#players"), players);
  refreshScoreOptions($("#score-options"));
}

function reset() {
  turn = { ...initTurnSettings};
  players = initPlayersSettings.map(function(player){ return {...player}; });
  refresh();
}

function nextTurn() {
  var playerIndex = players.findIndex(function(player){ return player.turn; });
  players[playerIndex].score -= turn.score;
  players[playerIndex].turn = false;
  checkScore(playerIndex);

  var nextPlayerIndex = players.length > playerIndex + 1 ? playerIndex + 1 : 0;
  players[nextPlayerIndex].turn = true;

  turn.throws = 0;
  turn.score = 0;

  refresh();
}

function checkScore(playerIndex) {
  if (players[playerIndex].score == 0) {
    $info.text("The winner is " + players[playerIndex].name);
  } else if (players[playerIndex].score < 0) {
    players[playerIndex].score = initScoreSettings;
  }
}

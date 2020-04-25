var GAME = null;
var GAME_BAK = null;

refresh();

function dismiss() {
  GAME.message = null;
  refresh();
}

function start() {
  GAME = $.extend(true, {}, gameObj);
  GAME.mode = getGameMode();
  GAME.message = null;
  GAME.players = getGamePlayers();
  GAME.scores = initGameScores(GAME.mode, GAME.players);
  GAME.turn = initGameTurn();
  GAME_BAK = $.extend(true, {}, GAME);
  refresh();
}

function end() {
  GAME = null;
  GAME_BAK = null;
  refresh();
}

function reset() {
  GAME = $.extend(true, {}, GAME_BAK);
  refresh();
}

function submit() {
  var playerId = GAME.turn.playerId;
  var score = getPlayerScore(playerId);
  var turnScore = 0;
  GAME.turn.throws.forEach(function(_throw) {
    score -= _throw.baseScore * _throw.multiplier;
  });
  if (score < 0) {
    GAME.message = $.extend(true, {}, messageObj);
    GAME.message.level = 2;
    GAME.message.text = "Turn not counted";
  } else {
    if (score == 0) {
      GAME.message = $.extend(true, {}, messageObj);
      GAME.message.level = 0;
      GAME.message.text = "The winner is " + getPlayerName(playerId) + "!";
    }
    GAME.scores.find(function(playerScore) {
      return playerScore.playerId == playerId;
    }).score = score;
  }
  var nextPlayer = GAME.players.findIndex(function(player) {
    return player.id == playerId;
  }) + 1;
  if (nextPlayer >= GAME.players.length) {
    nextPlayer = 0;
  }
  GAME.turn.playerId = GAME.players[nextPlayer].id;
  GAME.turn.throws = [];
  refresh();
}

function refresh() {
  if (GAME) {
    refreshGamePageUI();
  } else {
    refreshMainPageUI();
  }
  refreshMessageUI();
}

function getGameMode() {
  return $("#game-settings input[name=\"game\"]").val() * 1;
}

function getGamePlayers() {
  var players = [];
  $("#game-settings input[name=\"player\"]").each(function() {
    var name = $(this).val().trim();
    if (name.length == 0) {
      return;
    }
    var player = $.extend(true, {}, playerObj);
    player.id = players.length;
    player.name = name;
    players.push(player);
  });
  return players;
}

function initGameScores(mode, players) {
  var scores = [];
  players.forEach(function(player) {
    var score = $.extend(true, {}, scoreObj);
    score.playerId = player.id;
    score.score = mode;
    scores.push(score);
  });
  return scores;
}

function initGameTurn() {
  var turn = $.extend(true, {}, turnObj);
  turn.playerId = 0;
  turn.throws = [];
  return turn;
}

function getPlayerName(playerId) {
  return GAME.players.find(function(player) {
    return player.id == playerId;
  }).name;
}

function getPlayerScore(playerId) {
  return GAME.scores.find(function(playerScore) {
    return playerScore.playerId == playerId;
  }).score;
}

function onThrowScoreSelected(event) {
  if (GAME.turn.throws.length >= 3) {
    GAME.message = $.extend(true, {}, messageObj);
    GAME.message.level = 1;
    GAME.message.text = "You can throw only 3 darts per turn";
  } else {
    var _throw = $.extend(true, {}, throwObj);
    _throw.baseScore = event.data.baseScore;
    _throw.multiplier = event.data.multiplier;
    GAME.turn.throws.push(_throw);
  }
  refresh();
}

function onRevertThrowClick(event) {
  var baseScore = event.data.baseScore;
  var multiplier = event.data.multiplier;
  var throwIdx = GAME.turn.throws.findIndex(function(_throw) {
    return _throw.baseScore == baseScore && _throw.baseScore == multiplier;
  });
  GAME.turn.throws.splice(throwIdx, 1);
  refresh();
}

function refreshMainPageUI() {
  $("#game-page").hide();
  $("#main-page").show();
}

function refreshGamePageUI() {
  $("#main-page").hide();
  $("#game-page").show();
  $("#game-page #game-type").text(GAME.mode);
  refreshPlayersUI();
  refreshScoreOptionsUI();
}

function refreshMessageUI() {
  $("#message").hide();
  $("#message .text").empty();
  if (GAME && GAME.message) {
    switch (GAME.message.level) {
      case 1:
        $("#message .text").text("Error: " + GAME.message.text);
        break;
      case 2:
        $("#message .text").text("Warning: " + GAME.message.text);
        break;
      default:
        $("#message .text").text(GAME.message.text);
    }
    $("#message").show();
  }
}


$("#message #dismiss").click(function() {
  dismiss();
});

$("#main-page #start").click(function() {
  start();
});

$("#game-page #new").click(function() {
  end();
});

$("#game-page #reset").click(function() {
  reset();
});

var $playerSample = $("#players .player" + HTML_SAMPLE_SUFFIX);

function initPlayers($container, players) {
  var $player;
  $container.empty();
  for(var i = 0; i < players.length; i++) {
    $player = __initPlayer(players[i]);
    $container.append($player);
  }
  refreshPlayers($container, players);
}

function refreshPlayers($container, players) {
  var playerIndex = players.findIndex(player => player.turn);
  $container.find(".player").each(function(i) {
    var $player = $(this);
    $player.removeClass("turn");
    $player.find(".score").text(players[i].score);
    if (i == playerIndex) {
      $player.addClass("turn");
    }
  });
}

function __initPlayer(player) {
  var $player = getNewObjectFromSample($playerSample);
  $player.find(".name").text(player.name);
  return $player;
}

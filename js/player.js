var $playerSample = $("#players .player" + HTML_SAMPLE_SUFFIX);
var $turnScoreSample = $("#players .turn-score .button" + HTML_SAMPLE_SUFFIX);

var $players = $("#players");

function refreshPlayersUI() {
  $players.empty();
  GAME.players.forEach(function(player) {
    var $player = getNewObjectFromSample($playerSample);
    var playerScore = getPlayerScore(player.id);
    $player.find(".name").text(player.name);
    $player.find(".score").text(playerScore);

    if(GAME.turn.playerId == player.id) {
      var summaryTurnScore = playerScore;
      $player.find(".turn-score").empty();
      $player.find(".turn-score-summary").empty();
      if(GAME.turn.throws.length == 0) {
        $player.find(".turn-score").html("&nbsp;&nbsp;- 0");
      } else {
        GAME.turn.throws.forEach(function(_throw) {
          var $throw = getNewObjectFromSample($turnScoreSample);
          $throw.text(_throw.baseScore + (_throw.multiplier > 1 ? " x " + _throw.multiplier : ""));
          $throw.click({
            baseScore: _throw.baseScore,
            multiplier: _throw.multiplier
          }, onRevertThrowClick);
          $player.find(".turn-score").append($throw);
          summaryTurnScore -= _throw.baseScore * _throw.multiplier;
        });
      }
      $player.find(".turn-score-summary").text(summaryTurnScore);
      $player.find(".turn-score-submit").click(function() {
        submit();
      });
      $player.addClass("turn");
    }

    $players.append($player);
  });
}

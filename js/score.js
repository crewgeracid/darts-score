var $scoreOptionSample = $("#score-options .score-option" + HTML_SAMPLE_SUFFIX);
var $scoreButtonSample = $("#score-options .button" + HTML_SAMPLE_SUFFIX);
var $turnScoreButtonSample = $("#score-options .turn-score-button" + HTML_SAMPLE_SUFFIX);

function initScoreOptions($container) {
  var $scoreOption;
  $container.empty();
  for(var i = 1; i <= 20; i++) {
    $scoreOption = __initScoreOption(i, 3);
    $container.append($scoreOption);
  }
  $scoreOption = __initScoreOption(25, 2);
  $container.append($scoreOption);

  refreshScoreOptions($container);
}

function refreshScoreOptions($container) {
  $container.find(".score-option").each(function() {
    var $scoreOption = $(this);
    $scoreOption.find(".turn-scores").empty();
  });
}

function __initScoreOption(baseScore, multipliers) {
  var $scoreOption = getNewObjectFromSample($scoreOptionSample);
  $scoreOption.find(".label").text(baseScore);

  var $buttons = $scoreOption.find(".buttons");
  $buttons.empty();
  for(var multiplier = 1; multiplier <= multipliers; multiplier++) {
    var $button = __initScoreButton(baseScore * multiplier, multiplier);
    $button.click({
      jqScoreOption: $scoreOption,
      baseScore: baseScore,
      multiplier: multiplier
    }, __onScoreButtonClick);
    $buttons.append($button);
  }

  $scoreOption.find(".turn-scores").empty();
  return $scoreOption;
}

function __initScoreButton(score, label) {
  var $scoreButton = getNewObjectFromSample($scoreButtonSample);
  $scoreButton.text(label);
  $scoreButton.attr("value", score);
  return $scoreButton;
}

function __onScoreButtonClick(e) {
  var $scoreOption = e.data.jqScoreOption;
  var baseScore = e.data.baseScore;
  var multiplier = e.data.multiplier;

  $error.empty();
  if (turn.throws >= 3) {
    $error.text("Only 3 throws per player turn acceptable");
    return;
  }

  var score = baseScore * multiplier;
  turn.throws = turn.throws + 1;
  turn.score = turn.score + score;

  var $turnScoreButton = getNewObjectFromSample($turnScoreButtonSample);
  $turnScoreButton.text(baseScore + " x " + multiplier);
  $turnScoreButton.click({
    jqScoreOption: $scoreOption,
    jqTurnScoreButton: $turnScoreButton,
    baseScore: baseScore,
    multiplier: multiplier
  }, __onTurnScoreButtonClick);

  $scoreOption.find(".turn-scores").append($turnScoreButton);
}

function __onTurnScoreButtonClick(e) {
  var $scoreOption = e.data.jqScoreOption;
  var $turnScoreButton = e.data.jqTurnScoreButton;
  var baseScore = e.data.baseScore;
  var multiplier = e.data.multiplier;

  $error.empty();

  var score = baseScore * multiplier;
  turn.throws = turn.throws - 1;
  turn.score = turn.score - score;
  $turnScoreButton.remove();
}

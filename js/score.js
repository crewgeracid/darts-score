var $scoreOptionSample = $("#score-options .score-option" + HTML_SAMPLE_SUFFIX);
var $scoreButtonSample = $("#score-options .button" + HTML_SAMPLE_SUFFIX);

var $scoreOptions = $("#score-options");

function refreshScoreOptionsUI() {
  $scoreOptions.empty();
  var $scoreOption;
  for(var i = 1; i <= 20; i++) {
    $scoreOptions.append(__initScoreOption(i, 3));
  }
  $scoreOptions.append(__initScoreOption(25, 2));
}

function __initScoreOption(baseScore, multipliers) {
  var $scoreOption = getNewObjectFromSample($scoreOptionSample);
  $scoreOption.empty();
  for(var multiplier = 1; multiplier <= multipliers; multiplier++) {
    var $scoreButton = __initScoreButton(baseScore, multiplier);
    $scoreButton.click({
      baseScore: baseScore,
      multiplier: multiplier
    }, onThrowScoreSelected);
    $scoreOption.append($scoreButton);
  }
  return $scoreOption;
}

function __initScoreButton(baseScore, multiplier) {
  var $scoreButton = getNewObjectFromSample($scoreButtonSample);
  $scoreButton.text(multiplier > 1 ? " x " + multiplier : baseScore);
  return $scoreButton;
}

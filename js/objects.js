var gameObj = {
  mode: 0, // 301, 501
  message: null,
  players: [],
  scores: [],
  turn: null
};

var messageObj = {
  level: 0, // 0 - info, 1 - error, 2 - warn
  text: ""
};

var playerObj = {
  id: 0,
  name: ""
};

var scoreObj = {
  playerId: 0,
  score: 0
};

var turnObj = {
  playerId: 0,
  throws: []
};

var throwObj = {
  baseScore: 0,
  multiplier: 0
};

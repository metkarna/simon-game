$(document).ready(function(){
  $(".gamebutton").click(function(){
    addToPlayer(event.target.id)
  });
});

// Настраиваем игру
var game = {
  count: 0,
  possibilities: ['#green','#blue', '#red', '#dark'],
  currentGame: [],
  player: []
}


// Сбравсываем настройки
function clearGame() {
  game.currentGame = [];
  game.count = 0;
  addCount();
}

// Показываем ходы пользователю с интервалом
function showMoves() {
  var i = 0;
  var moves = setInterval(function(){
    playGame(game.currentGame[i]);
    i++;
    if (i >= game.currentGame.length) {
      clearInterval(moves);
    }
  }, 600)
  clearPlayer();
}

// Конкретное нажатие по выбранному полю
function playGame(field) {
  $(field).addClass('hover');
  setTimeout(function(){
      $(field).removeClass('hover');
  }, 300);
}

// Очищаем ходы пользователя
function clearPlayer() {
  game.player = [];
}

// Добавляем пользователю ход
function addToPlayer(id) {
  var field = "#"+id
  game.player.push(field);
  playerTurn(field);
} 

function playerTurn(x) {
  if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
    printText('Неправильный ход! Попробуй еще раз.');
    showMoves();
  } 
  else {
    printText('Хорошо');
    var check = game.player.length === game.currentGame.length;
    if (check) {
      if (game.count == 10) {
         printText('Игра выйграна. Поздравляю.');
         clearGame();
      }
      else addCount();
    }
  }
} 

// Добавляем количество ходов
function addCount() {
  printText('...');
  game.count++;
  $('#clickNumber').html(game.count);
  game.currentGame.push(game.possibilities[(Math.floor(Math.random()*4))]);
  showMoves();
}

function printText(str){
  $(".small").text(str);
}

clearGame();
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;
var gamePattern = [];

//events
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var clr = $(this).attr("id");
  userClickedPattern.push(clr);
  makeSound(clr);
  animatePress(clr);
  checkAnswer(userClickedPattern.length - 1);
});

//functions
function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  makeSound(randomChosenColor);
}

function makeSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Good!");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        $("#level-title").text("Level " + level);
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Its Wrong! Try Again.");
    $(document).addClass("game-over");
    setTimeout(function () {
      $(document).removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    makeSound("wrong");
    startOver();
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

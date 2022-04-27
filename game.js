var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
var started=false;
var level=0;
var gamePattern=[];
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function(){
    var clr=$(this).attr("id");
    userClickedPattern.push(clr);
    makeSound(clr);
    animatePress(clr);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColor);
}

function makeSound(name){
    var audio=new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){$("#"+currentColor).removeClass("pressed");},100);
}

function checkAnswer(currentLevel) {

    
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
            $("#level-title").text("Level "+level);
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      $(document).addClass("game-over");
      setTimeout(function(){$(document).removeClass("game-over");},200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      makeSound("wrong");
      startOver();

    }

}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];

}
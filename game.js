var buttonColors = ["red","blue","green","yellow"];

var userClickedPattern = [];
var gameArray = [];

var level = 0;
var started = false;

$(document).keypress(function(){
        if(!started)
        {
                $("h1").text("Level "+level);
                nextSequence();
                started = true;
        }
});



$(".btn").click(function()
{
        var userChosenColor = $(this).attr("id"); 
        userClickedPattern.push(userChosenColor);

        playsound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length-1);
});

    
    

function checkAnswer(currentLevel)
{
    if(gameArray[currentLevel] === userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length === gameArray.length)
        {
                console.log("success");
                setTimeout(function()
                {
                        nextSequence();
                },1000);
        }
    }
        else {
                playsound("wrong");
                $("body").addClass("game-over");
                $("h1").text("Game Over, Press any Key to Restart");

                setTimeout(function()
                {
                    $("body").removeClass("game-over");
                },200);

                startOver();
                console.log("failed");
        }
    }


function nextSequence()
{
    level++;
    $("h1").text("Level "+level);

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    gameArray.push(randomChosenColor);
    console.log(gameArray.length);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);
}


function playsound(name)
{
    var audio1 = new Audio('sounds/'+ name +'.mp3');
    audio1.play();

}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function startOver()
{
        level = 0;
        gameArray = [];
        started = false;
}
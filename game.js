var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"]
var level = 0;

$(document).on("keydown", function() {
    if(level === 0 ) {
        nextSequence();
    }
});

$(".btn").on("click", function() {
    if(level > 0) {
        // get the color of the button that user clicked
        var userChosenColour = $(this).attr("id");

        // make the shape for user clicked
        animatePress(userChosenColour);
        // feed the user pattern
        userClickedPattern.push(userChosenColour);

        console.log(gamePattern);
        console.log(userClickedPattern);

        // check the logic
        makeDecision(check(), userChosenColour);
    } 
});





function nextSequence() {
    // generate random number then get the corresponding color
    var number = Math.floor(Math.random() * 4);
    var randomChosenColour =  buttonColours[number];
    
    // collect the pattern of the game
    gamePattern.push(randomChosenColour);

    // make the shape and sound of buttom clicked by computer
    $("#" + randomChosenColour).fadeIn(150).fadeOut(150).fadeIn(150);
    playSound(randomChosenColour);

    // Update the title
    level++;
    $("h1").text("level " + level);

}

function playSound(name) {
        var audio = new Audio("./" + "sounds/" + name + ".mp3");
        audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function check() {
    var index = userClickedPattern.length - 1;
    if(userClickedPattern[index] !== gamePattern[index])
    {
        userClickedPattern = [];
        gamePattern = [];
        return -1;
    }
    else if(userClickedPattern.length === gamePattern.length) {
        userClickedPattern = [];
        return 1;
    }
    else
        return 0;
}

function makeDecision(checkNum, color) {
    if (checkNum === 1) {
        playSound(color);
        setTimeout(function(){nextSequence()}, 500);
    }

    else if (checkNum === -1) {
        $("body").addClass("game-over");
        $("h1").text("Game Over😋");
        $("#score").text("Score = " + level).removeClass("hidden");
        playSound("wrong");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 500);
        level = -1;

        $(document).keydown(function() {
            if(level === -1) {
                $("body").removeClass("game-over");
                $("#score").addClass("hidden");
                $("h1").text("Press any Key to Start");
                level = 0;
            }   
        });
    }
    else
        playSound(color);
}
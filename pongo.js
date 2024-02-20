const $pong = $('#pong');
const $padel1 = $('#padel-1');
const $padel2 = $('#padel-2')
const $ball = $('#ball');
const $restart = $('#restart');
const $start = $('#start');
const $start2 = $('#start2');

//which way the ball will go when it comes into contact with wall or players.
const UP_LEFT = -3 * Math.PI / 4;
const UP_RIGHT = - Math.PI / 4;
const DOWN_LEFT = 3 * Math.PI / 4;
const DOWN_RIGHT = Math.PI / 4;

let interval = null;
let padel2 = null;
let ball = null;


//hide button that is used for starting when you reset
$("#start2").hide();
$('#ball').hide();
$('#padel-1').hide();
$('#padel-2').hide();
$('#verticalLine').hide();
$('#restart').hide();

//original start button starts the game
$start.click(function () {
    clearInterval(interval);
    $("#start").hide();
    $('#ball').fadeIn('fast');
    $('#padel-1').fadeIn('fast');
    $('#padel-2').fadeIn('fast');
    $('#verticalLine').fadeIn('fast');
    $('#restart').fadeIn('fast');
    $('#instructions').hide();

    //this button restarts the game
    $restart.click(function () {
        $('#congrats').hide();
        $('#restart').hide();
        $('#verticalLine').hide();


        // position + speed + angle in which the computer padel will end on
        padel2 = {
            direction: 0,
            SPEED: 0,
            top: 100
        }

        // position + speed + angle in which the ball will end on
        ball = {
            top: 250,
            left: 290,
            angle: UP_LEFT,
            SPEED: 0
        }
        $('#ball').fadeOut('fast');
        $('#padel-1').fadeOut('fast');
        $('#padel-2').fadeOut('fast');
        $("#start2").show();
    })

    //second button i made so that you can start after you restart the game instead of going right into the game you get to choose when you want to play
    $start2.click(function () {
        $("#start2").hide();
        clearInterval(interval);
        init();
        clearInterval(interval);
        blueScore = 10;
        redScore = 10;
        clearInterval(interval);
        $('#congrats').empty();
        $('#ball').fadeIn('fast');
        $('#padel-1').fadeIn('fast');
        $('#padel-2').fadeIn('fast');
        $('#redScore').empty().append(redScore);
        $('#blueScore').empty().append(blueScore);
        $('#restart').fadeIn('fast');
        $('#verticalLine').fadeIn('fast');


    })

    function init() {
        padel2 = {
            direction: 1,
            top: 100,
            SPEED: 13,
        }

        //ball class for position  speed and angle in whic it will move at beginign
        ball = {
            //randomize where the ball start
            top: Math.floor(Math.random() * 300) + 1,
            left: 460,
            angle: UP_LEFT,
            SPEED: 8
        }

        //call function that changes padel 2 position
        interval = setInterval(update, 20);
    }//move the mouse = move the player
    $pong.mousemove(function (evt) {

        //keep the player inseide the box
        const top = Math.min(
            $pong.height() - $padel1.height(),
            evt.pageY - $pong.offset().top)
        $padel1.css({
            top: `${top}px`
        });
    });

    function update() {
        updatePadel2();
        updateBall();
    }

    //function that updates ball position
    function updateBall() {
        //move on y
        ball.top += ball.SPEED * Math.sin(ball.angle);
        //move on x
        ball.left += ball.SPEED * Math.cos(ball.angle);
        $ball.css({
            top: `${ball.top}px`,
            left: `${ball.left}px`
        });

        // ball changes direction when hits user padel
        if (ballHitsUserPadel()) {
            if (ball.angle === UP_LEFT) {
                ball.angle = UP_RIGHT;
                ball.SPEED = (ball.angle * ball.angle) + 13;


            } else {
                ball.angle = DOWN_RIGHT;
                ball.SPEED = (ball.angle * ball.angle) + 13;
            }
        }

        // ball changes direction when hits computer padel
        if (ballHitsComputerPadel()) {
            if (ball.angle === UP_RIGHT) {
                ball.angle = UP_LEFT;
                ball.SPEED = (ball.angle * ball.angle) + 13;

            } else {
                ball.angle = DOWN_LEFT;
                ball.SPEED = (ball.angle * ball.angle) + 13;
            }
        }

        //if ball hits top of box it goes down
        if (isBallHittingTop()) {
            if (ball.angle === UP_RIGHT) {
                ball.angle = DOWN_RIGHT;
            } else {
                ball.angle = DOWN_LEFT;
            }
        }

        if (isBallHittingBottom()) {
            if (ball.angle === DOWN_RIGHT) {
                ball.angle = UP_RIGHT;
            } else {
                ball.angle = UP_LEFT;
            }
        }

        const winner = getWinner();
        if (winner) {
            endGame(winner);
        }
    }
    //Checks if ball hits user padel
    function ballHitsUserPadel() {
        return $ball.overlaps($padel1).length > 0
    }

    //Checks if ball hits computer computer padel
    function ballHitsComputerPadel() {
        return $ball.overlaps($padel2).length > 0
    }

    //Checks if ball hits top of container
    function isBallHittingTop() {
        return ball.top <= 0;
    }

    //Checks if ball hits bottom of container
    function isBallHittingBottom() {
        return ball.top >= $pong.height() - $ball.height();
    }

    //function that changes opponents padel position
    function updatePadel2() {

        //if compmuter pong goes to the top it shoots back down
        if (padel2.top > $pong.height() - $padel2.height()) {
            padel2.direction = -1;
        }

        //if computer pong goes to the top of square it goes back down
        if (padel2.top < 0) {
            padel2.direction = 1;
        }

        padel2.top += padel2.direction * padel2.SPEED
        $padel2.css({
            top: `${padel2.top}px`
        });
    }


    //move the mouse = move the player
    $pong.mousemove(function (evt) {

        //keep the player inseide the box
        const top = Math.min(
            $pong.height() - $padel1.height(),
            evt.pageY - $pong.offset().top)
        $padel1.css({
            top: `${top}px`
        });
    });

    let redScore = 10;
    let blueScore = 10;

    let blueWins = 0;
    let redWins = 0;

    function getWinner() {
        //point for red = it hits the left side
        if (ball.left < 0) {
            init();
            clearInterval(interval);
            //change score board
            redScore--;
            $('#redScore').empty().append(redScore);
            //if red gets 5 pointsthey win
            if (redScore == 0) {
                endGamee();
                redWins++
                $('#redWins').empty().append("Red team wins: " + (redWins));

            }
        }
        //point for blue = it hits the right side
        else if (ball.left > $pong.width() - $ball.width()) {
            init();
            clearInterval(interval);
            //change score board
            blueScore--;
            $('#blueScore').empty().append(blueScore);
            //if blue gets 5 points they win
            if (blueScore == 0) {
                endGamee();
                blueWins++;
                $('#blueWins').empty().append("Blue team wins: " + (blueWins));

            }
        } else {
            return false;
        }
        function endGamee() {
            // position + speed + angle in which the computer padel will end on
            padel2 = {
                direction: 0,
                SPEED: 0,
                top: 100
            }

            // position + speed + angle in which the ball will end on
            ball = {
                top: 250,
                left: 290,
                angle: UP_LEFT,
                SPEED: 0
            }
            $('#ball').fadeOut('fast');
            $('#padel-1').fadeOut('fast');
            $('#padel-2').fadeOut('fast');
            $('#verticalLine').fadeOut('fast');


            //text for winner at the end
            //font is red for red team
            if (redScore == 0) {
                $("#congrats").css("color", "red");
                $('#congrats').append('Red Wins!');
                $('#congrats').fadeIn('fast');

            }
            //font is blue for blue team
            if (blueScore == 0) {
                $("#congrats").css("color", "blue");
                $('#congrats').append('Blue Wins!');
                $('#congrats').fadeIn('fast');

            }
        }

    }
    init();
})

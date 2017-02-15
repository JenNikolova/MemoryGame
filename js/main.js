(function () {
    function startNewGame(uniques, duplicates) {
        var game = createGame({
            gameArea: document.querySelector('#game-area'),
            timerArea: document.querySelector('#timer-area'),
            onVictory: function onVictory(time) {
                menu.show('You won in ' + time + ' seconds! Do you want to play again?');
            }

        });
        menu.hide();
        game.start(uniques, duplicates);
    }

    var menu = createMenu(document.querySelector("#menu-area"), startNewGame);
}());
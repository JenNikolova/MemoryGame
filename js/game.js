function createGame(gameObject) {
    var timer = createTimer(gameObject.timerArea);
    var deck;
    var openCards;
    var uniques;
    var duplicates;
    var isClickDisabled;

    function disableClick(callback, ms) {
        isClickDisabled = true;
        setTimeout(function () {
            callback();
            isClickDisabled = false;

            checkForVictory();
            renderGame();
        }, ms || 1000);
    }

    function hideGame() {
        gameObject.timerArea.style.visibility = 'hidden';
        gameObject.gameArea.style.visibility = 'hidden';
    }

    function showGame() {
        gameObject.gameArea.style.visibility = 'visible';
        gameObject.timerArea.style.visibility = 'visible';
    }

    function renderGame() {
        gameObject.gameArea.innerHTML = renderCards(deck);
    }

    function checkForVictory() {
        if (deck.every(function (card) {
                return card.visible === false;
            })) {
            hideGame();
            timer.stop();
            gameObject.onVictory(timer.get());
        }
    }

    function closeAllCards() {
        openCards.forEach(function (el) {
            el.closed = true;
        });
        openCards = [];
    }

    function hideSolvedCards() {
        openCards.forEach(function (card) {
            card.visible = false;
        });
        openCards = [];
    }

    function handleTurn(event) {
        var card = deck[event.target.getAttribute('data-id')];

        var ignoreClick = !card || isClickDisabled || !card.visible || openCards.indexOf(card) >= 0;
        if (ignoreClick) {
            return;
        }

        openCards.push(card);

        card.closed = false;

        var areCardsAllTheSame = openCards.every(function (el) {
            return el.category === card.category;
        });

        if (openCards.length > 1 && !areCardsAllTheSame) {
            disableClick(closeAllCards, 1000);
        } else if (openCards.length === duplicates && areCardsAllTheSame) {
            disableClick(hideSolvedCards, 500);
        }

        checkForVictory();
        renderGame();
    }

    return {
        handleClick: handleTurn,
        start: function (u, d) {
            uniques = Number.parseInt(u, 10) || 8;
            duplicates = Number.parseInt(d, 10) || 2;

            deck = makeRandomizedDeck(uniques, duplicates);

            gameObject.gameArea.onclick = handleTurn;
            isClickDisabled = false;
            openCards = [];

            timer.start();
            showGame();
            renderGame();
        }
    };
}
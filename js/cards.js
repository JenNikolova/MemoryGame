function makeRandomNumber(limit) {
    return Math.floor(Math.random() * limit);
}

function makeCard(category) {
    return {
        visible: true,
        closed: true,
        category: category
    };
}

function makeRandomizedDeck(n, duplicates) {
    n = n || 12;
    duplicates = duplicates || 2;
    var numbers = [];
    var results = [];

    for (var i = 0; i < duplicates; i += 1) {
        for (var j = 0; j < n; j += 1) {
            numbers.push(makeCard(j));
        }
    }

    while (numbers.length > 0) {
        var randomNumber = makeRandomNumber(numbers.length);
        results.push(numbers.splice(randomNumber, 1)[0]);
    }

    return results;
}

function renderCards(elements) {
    return elements.reduce(function (result, element, index) {
        result += renderCard(element, index);
        return result;
    }, "");
}

function renderCard(element, index) {
    cssClass = 'card icon' + element.category;
    if (!element.visible) {
        cssClass += ' solved';
    }
    if (element.closed) {
        cssClass += ' closed';
    }

    return "<div data-id='" + index + "' class='" + cssClass + "'></div>";
}
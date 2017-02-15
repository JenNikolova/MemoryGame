function createMenu(menuArea, startNewGame) {
    var menuMessage = menuArea.querySelector("#menu-message");
    var menuButtons = menuArea.querySelectorAll('button');

    function showMenu(message) {
        menuArea.style.display = 'block';
        menuMessage.innerHTML = message;
    }

    function hideMenu() {
        menuArea.style.display = 'none';
    }

    menuButtons.forEach(function (btn) {
        var uniqs = btn.getAttribute('uniq-cards') || 8;
        var dups = btn.getAttribute('duplicates') || 2;
        btn.onclick = startNewGame.bind(null, uniqs, dups);
    });

    return {
        show: showMenu,
        hide: hideMenu
    };
}
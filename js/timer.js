function createTimer(timerArea) {
    var timer;
    var startTime;

    function startTimer() {
        stopTimer();
        timerArea.innerHTML = '0';
        startTime = Date.now();
        renderTimer();
    }

    function getTimer() {
        return Math.floor((Date.now() - startTime) / 1000);
    };

    function stopTimer() {
        clearInterval(timer);
    }

    function renderTimer() {
        timer = setInterval(function () {
            timerArea.innerHTML = getTimer();
        }, 1000);
    }

    return {
        start: startTimer,
        get: getTimer,
        stop: stopTimer
    };
}
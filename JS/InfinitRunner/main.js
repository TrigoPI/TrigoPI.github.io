(() => {
    game = new Game();

    setInterval(() => {
        game.loop();
    }, 1000 / Settings.FPS);
})();
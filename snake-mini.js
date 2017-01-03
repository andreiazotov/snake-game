;function Game(sceneId) {
    this.scene = document.getElementById(sceneId);
    this.screen = this.scene.getContext("2d");
    this.gameSize = {width: this.screen.canvas.width, height: this.screen.canvas.height};
    this.bodies = {snake: new Snake(10), meal: new Meal(10)};
    var game = this;
    function tick() {
        if (game.bodies.snake.headPosition.x === game.bodies.meal.position.x && game.bodies.snake.headPosition.y === game.bodies.meal.position.y) {
            game.bodies.snake.length++;
            game.bodies.meal.position.x = Math.floor(Math.random() * (game.gameSize.width / 10)) * 10;
            game.bodies.meal.position.y = Math.floor(Math.random() * (game.gameSize.height / 10)) * 10;
        }
        window.onkeydown = function(e) {
            if (e.keyCode === 37 && !game.bodies.snake.direction.right) game.bodies.snake.direction = {left: true};
            if (e.keyCode === 39 && !game.bodies.snake.direction.left) game.bodies.snake.direction = {right: true};
            if (e.keyCode === 38 && !game.bodies.snake.direction.down) game.bodies.snake.direction = {up: true};
            if (e.keyCode === 40 && !game.bodies.snake.direction.up) game.bodies.snake.direction = {down: true};
        }
        game.bodies.snake.tailPosition.push([game.bodies.snake.headPosition.x, game.bodies.snake.headPosition.y]);
        game.bodies.snake.headPosition.x += game.bodies.snake.direction.left ? -game.bodies.snake.size.width : game.bodies.snake.direction.right ? game.bodies.snake.size.width : 0;
        game.bodies.snake.headPosition.y += game.bodies.snake.direction.up ? -game.bodies.snake.size.height : game.bodies.snake.direction.down ? game.bodies.snake.size.height : 0;
        if (game.bodies.snake.headPosition.x < 0) game.bodies.snake.headPosition.x = game.gameSize.width - game.bodies.snake.size.width;
        if (game.bodies.snake.headPosition.y < 0) game.bodies.snake.headPosition.y = game.gameSize.height - game.bodies.snake.size.height;
        if (game.bodies.snake.headPosition.x > game.gameSize.width - game.bodies.snake.size.width) game.bodies.snake.headPosition.x = 0;
        if (game.bodies.snake.headPosition.y > game.gameSize.height - game.bodies.snake.size.height) game.bodies.snake.headPosition.y = 0;
        if (game.bodies.snake.tailPosition.length === (game.gameSize.height / game.bodies.snake.size.height) * (game.gameSize.width / game.bodies.snake.size.width)) game.bodies.snake.tailPosition.shift();
        for (var i = 0; i < game.bodies.snake.length - 1; i++)
            if (game.bodies.snake.headPosition.x === game.bodies.snake.tailPosition[game.bodies.snake.tailPosition.length-1-i][0] && game.bodies.snake.headPosition.y === game.bodies.snake.tailPosition[game.bodies.snake.tailPosition.length-1-i][1]) document.location.reload(true);
        game.screen.clearRect(0, 0, game.gameSize.width, game.gameSize.height);
        game.screen.fillRect(game.bodies.snake.headPosition.x, game.bodies.snake.headPosition.y, game.bodies.snake.size.width, game.bodies.snake.size.height);
        for (var i = 0; i < game.bodies.snake.length - 1; i++)
            game.screen.fillRect(game.bodies.snake.tailPosition[game.bodies.snake.tailPosition.length-1-i][0], game.bodies.snake.tailPosition[game.bodies.snake.tailPosition.length-1-i][1], game.bodies.snake.size.width, game.bodies.snake.size.height);
        game.screen.fillRect(game.bodies.meal.position.x, game.bodies.meal.position.y, game.bodies.meal.size.width, game.bodies.meal.size.height);
        requestAnimationFrame(tick);
    }
    tick();
}
function Meal(size) {
    this.size = {width: size, height: size};
    this.position = {x: 0, y: 0};
}
function Snake(size) {
    this.length = 1;
    this.size = {width: size, height: size};
    this.direction = {right: true};
    this.headPosition = {x: 0, y: 0 }
    this.tailPosition = [];
}
window.onload = function() { new Game("main-scene"); }

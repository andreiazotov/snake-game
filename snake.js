;(function() {

    function Game(sceneId) {
        var FPS = 45;
        var SEC = 1000;
        var BODIES_SIZE = 10;
        this.scene = document.getElementById(sceneId);
        this.screen = this.scene.getContext("2d");
        this.gameSize = {
            width: this.screen.canvas.width,
            height: this.screen.canvas.height
        };
        this.bodies = {
            snake: new Snake(BODIES_SIZE),
            meal: new Meal(BODIES_SIZE)
        };
        var game = this;
        function tick() {
            setTimeout(function() {
                game.update(game.bodies.snake, game.bodies.meal);
                game.draw(game.bodies.snake, game.bodies.meal);
                requestAnimationFrame(tick);
            }, SEC / FPS);
        }
        tick();
    }

    Game.prototype.update = function(snake, meal) {
        snake.eat(meal, this.gameSize.width);
        snake.move(this.gameSize);
    };

    Game.prototype.draw = function(snake, meal) {
        this.screen.clearRect(0, 0, this.gameSize.width, this.gameSize.height);
        this.screen.fillStyle = "#d21034";
        this.screen.fillRect(snake.headPosition.x, snake.headPosition.y, snake.size.width, snake.size.height);
        for (var i = 0; i < snake.length - 1; i++) {
            var tailPosX = snake.tailPosition[snake.tailPosition.length-1-i][0];
            var tailPosY = snake.tailPosition[snake.tailPosition.length-1-i][1];
            this.screen.fillRect(tailPosX, tailPosY, snake.size.width, snake.size.height);
        }
        this.screen.fillRect(meal.position.x, meal.position.y, meal.size.width, meal.size.height);
    };

    function Meal(size) {
        this.size = {
            width:  size,
            height: size
        };
        this.position = {
            x: 0,
            y: 0
        };
    }

    function Snake(size) {
        this.length = 1;
        this.size = {
            width:  size,
            height: size
        };
        this.direction = {
            right: true
        };
        this.headPosition = {
            x: 0,
            y: 0
        };
        this.tailPosition = [];
    }

    Snake.prototype.move = function(gameSize) {
        var keys = {
            LEFT_ARROW_BUTTON:  37,
            RIGHT_ARROW_BUTTON: 39,
            UP_ARROW_BUTTON:    38,
            DOWN_ARROW_BUTTON:  40
        };
        var self = this;
        window.onkeydown = function(e) {
            if (e.keyCode === keys.LEFT_ARROW_BUTTON  && !self.direction.right) {
                self.direction = {left: true};
            }
            if (e.keyCode === keys.RIGHT_ARROW_BUTTON && !self.direction.left) {
                self.direction = {right: true};
            }
            if (e.keyCode === keys.UP_ARROW_BUTTON    && !self.direction.down) {
                self.direction = {up: true};
            }
            if (e.keyCode === keys.DOWN_ARROW_BUTTON  && !self.direction.up) {
                self.direction = {down: true};
            }
        };
        var dx = this.direction.left ? -this.size.width : this.direction.right ? this.size.width : 0;
        var dy = this.direction.up ? -this.size.height : this.direction.down ? this.size.height : 0;
        this.tailPosition.push([this.headPosition.x, this.headPosition.y]);
        this.headPosition.x += dx;
        this.headPosition.y += dy;
        if (this.headPosition.x < 0) {
            this.headPosition.x = gameSize.width - this.size.width;
        }
        if (this.headPosition.y < 0) {
            this.headPosition.y = gameSize.height - this.size.height;
        }
        if (this.headPosition.x > gameSize.width - this.size.width) {
            this.headPosition.x = 0;
        }
        if (this.headPosition.y > gameSize.height - this.size.height) {
            this.headPosition.y = 0;
        }
        if (this.tailPosition.length === (gameSize.height / this.size.height) * (gameSize.width / this.size.width)) {
            this.tailPosition.shift();
        }
        for (var i = 0; i < this.length - 1; i++) {
            if (this.headPosition.x === this.tailPosition[this.tailPosition.length-1-i][0] &&
                this.headPosition.y === this.tailPosition[this.tailPosition.length-1-i][1]) {
                    alert("You lost!");
                    document.location.reload(true);
                }
        }
    };

    Snake.prototype.eat = function(meal, gameSize) {
        if (this.headPosition.x === meal.position.x && this.headPosition.y === meal.position.y) {
            this.length++;
            meal.position.x = getRandomInt(gameSize, meal.size.width);
            meal.position.y = getRandomInt(gameSize, meal.size.height);
        }
    };

    function getRandomInt(gameSize, bodiesSize) {
        return Math.floor(Math.random() * (gameSize / bodiesSize)) * bodiesSize;
    }

    window.onload = function() { new Game("main-scene"); };

})();

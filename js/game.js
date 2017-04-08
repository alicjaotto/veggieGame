var Furry = require("./furry.js");
var Coin = require("./coin.js");
var Coin2 = require("./coin.js");
var SuperCoin = require("./coin.js");
var Trap = require("./coin.js");

//konstruktor gry
    var Game = function() {
        this.furry = new Furry();
        this.coin = new Coin();
        this.coin2 = new Coin2();
        this.superCoin = new SuperCoin();
        this.trap = new Trap();
        this.board = document.querySelectorAll("#board div");
        this.score = 0;


        //metoda :przetłumaczenie x i y na tablicę z divami - wylosowanie pola
        this.index = function(x,y) {
            return x + (y*10);
        }

        // metoda: czyszczenie poprzedniego futrzaka
        this.hideVisibleFurry = function() {
            var previousFurry = document.querySelector('.furry');
            previousFurry.classList.remove('furry');
        }

        //metoda: pokazanie futrzaka
        this.showFurry = function() {
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        }

        //metoda: pokazanie monety
        this.showCoin = function() {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        }

        //metoda: pokazanie drugiej monety
        this.showCoin2 = function() {
            this.board[this.index(this.coin2.x, this.coin2.y)].classList.add('coin2');
        }


        //metoda: pokazywanie i znikanie pułapki (-1pkt)
        this.showTrap = function() {
            var self = this;
            self.trapInterval = setInterval(function() {
                self.board[self.index(self.trap.x, self.trap.y)].classList.toggle('trap');
            }, 2000);
        }


        //metoda: pokazywanie i znikanie supermonety (+3pkt)
        this.showSuperCoin = function() {
            var self = this;
            self.superCoinInterval = setInterval(function() {
                self.board[self.index(self.superCoin.x, self.superCoin.y)].classList.toggle('superCoin');
            }, 5000);
        }

        //metoda: przemieszczanie się futrzaka
        this.moveFurry = function() {

            var self = this.furry;
            this.hideVisibleFurry();

            if (self.direction === "right") {
                self.x = self.x + 1;
            } else if (self.direction === "left") {
                self.x = self.x - 1;
            } else if (self.direction === "down") {
                self.y = self.y + 1;
            } else if (self.direction === "up") {
                self.y = self.y - 1;
            }

            if (this.gameOver() === true) {
                return;
            }
            this.showFurry();
            this.checkCoinCollision();
            this.checkCoin2Collision();
            this.checkTrapCollision();
            this.checkSuperCoinCollision();
        }

        //zmiana kierunku poruszania się futrzaka
        this.turnFurry = function(event) {
            switch (event.which) {
                case 37:
                    this.furry.direction = "left";
                    break;
                case 38:
                    this.furry.direction = "up";
                    break;
                case 39:
                    this.furry.direction = "right";
                    break;
                case 40:
                    this.furry.direction = "down";
            }
        }

        //sprawdzenie kolizji z monetą
        this.checkCoinCollision = function() {
            var result = document.querySelector("#score div strong");
            if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
                this.score = this.score + 1;
                result.innerText = this.score;
                this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
                this.coin = new Coin();
                this.showCoin();
            }
        }

        //sprawdzenie kolizji z drugą monetą
        this.checkCoin2Collision = function() {
            var result = document.querySelector("#score div strong");
            if (this.furry.x == this.coin2.x && this.furry.y == this.coin2.y) {
                this.score = this.score + 2;
                result.innerText = this.score;
                this.board[this.index(this.coin2.x, this.coin2.y)].classList.remove('coin2');
                this.coin2 = new Coin2();
                this.showCoin2();
            }
        }

        //sprawdzanie kolizji z supermonetą
        this.checkSuperCoinCollision = function() {
            var result = document.querySelector("#score div strong");
            if (this.furry.x == this.superCoin.x && this.furry.y == this.superCoin.y && this.board[this.index(this.superCoin.x, this.superCoin.y)].classList.contains("superCoin")) {
                this.score = this.score + 3;
                result.innerText = this.score;
                this.board[this.index(this.superCoin.x, this.superCoin.y)].classList.remove('superCoin');
                this.superCoin = new SuperCoin();
                this.showSuperCoin();
            }
        }

        //sprawdzanie kolizji z pułapką
        this.checkTrapCollision = function() {
            var result = document.querySelector("#score div strong");
            if (this.furry.x == this.trap.x && this.furry.y == this.trap.y && this.board[this.index(this.trap.x, this.trap.y)].classList.contains("trap")) {
                this.score = this.score - 2;
                result.innerText = this.score;
                this.board[this.index(this.trap.x, this.trap.y)].classList.remove('trap');
                this.trap = new Trap();
                this.showTrap();
            }
        }

        //kolizja ze ścianą
        this.gameOver = function() {
            if (this.furry.x<0 || this.furry.x>9 || this.furry.y<0 || this.furry.y>9) {
                clearInterval(this.idSetInterval);
                var over = document.getElementById('over');
                over.classList.remove("invisible");
                var result = document.querySelector("#over h3 span");
                result.innerText = this.score+" ";
                return true;
            }
        }
        //rozpoczęcie gry
        this.startGame = function() {
            this.showFurry();
            this.showCoin();
            this.showCoin2();
            this.showTrap();
            this.showSuperCoin();
            var self = this;
            self.idSetInterval = setInterval(function() {
                self.moveFurry();}
                , 250);
        }
    }

module.exports = Game;

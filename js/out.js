/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


//konstruktor monety
var Coin = function() {
    this.x = Math.floor(Math.random()*10);
    this.y = Math.floor(Math.random()*10);
}
module.exports = Coin;

//konstruktor drugiej monety
var Coin2 = function() {
    this.x = Math.floor(Math.random()*10);
    this.y = Math.floor(Math.random()*10);
}
module.exports = Coin2;

//konstruktor suprmonety
var SuperCoin = function() {
    this.x = Math.floor(Math.random()*10);
    this.y = Math.floor(Math.random()*10);
}
module.exports = SuperCoin;

//konstruktor pułapki
var Trap = function() {
    this.x = Math.floor(Math.random()*10);
    this.y = Math.floor(Math.random()*10);
}
module.exports = Trap;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(3);
var Coin = __webpack_require__(0);
var Coin2 = __webpack_require__(0);
var SuperCoin = __webpack_require__(0);
var Trap = __webpack_require__(0);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

document.addEventListener("DOMContentLoaded", function(){
    var Game = __webpack_require__(1);

    var game = new Game();
    game.startGame();


    document.addEventListener('keydown' , function(event){
        game.turnFurry(event);
    });

});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

//konstruktor Furry'ego
    var Furry = function(){
        this.x = 0;
        this.y = 0;
        this.direction = "right";
    }

module.exports = Furry;


/***/ })
/******/ ]);
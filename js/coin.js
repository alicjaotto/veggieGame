
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

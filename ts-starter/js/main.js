var Game = (function () {
    function Game() {
        var _this = this;
        this.el = document.querySelector('#body');
        this.name = 'Whack the Mole';
        this.allHoles = [];
        this.mole = new Mole(this.allHoles, 'mole');
        this.startHandler = function (event) {
            console.log(_this);
            _this.timeUp = false;
            _this.loop();
            setTimeout(function () {
                _this.timeUp = true;
            }, 10000);
        };
        this.clickHandler = function (event) {
            if (event.srcElement.className == 'mole up') {
                console.log('verklikt');
            }
        };
        for (var i = 0; i < 6; i++) {
            this.allHoles[i] = new Hole(i);
        }
        console.dir(this.allHoles);
        this.render();
    }
    Game.prototype.render = function () {
        var div = document.createElement('div');
        div.className = 'game';
        div.addEventListener('click', this.clickHandler);
        this.el.appendChild(div);
        for (var i = 0; i < 6; i++) {
            this.allHoles[i].render();
        }
        var button = document.createElement('button');
        button.id = 'start';
        button.innerHTML = 'start';
        this.el.appendChild(button);
        document.addEventListener("click", this.startHandler);
    };
    Game.prototype.randomTime = function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    };
    Game.prototype.loop = function () {
        var _this = this;
        var time = this.randomTime(200, 1000);
        this.mole.render();
        setTimeout(function () {
            if (!_this.timeUp)
                _this.loop();
        }, time);
    };
    return Game;
}());
var Hole = (function () {
    function Hole(id) {
        this.id = id;
    }
    Hole.prototype.getId = function () {
        return this.id;
    };
    Hole.prototype.render = function () {
        var parent = document.querySelector('.game');
        var div = document.createElement('div');
        div.classList.add('hole', 'hole' + this.id);
        parent.appendChild(div);
    };
    return Hole;
}());
var app = {};
(function () {
    var init = function () {
        console.log('init');
        app.game = new Game();
    };
    window.addEventListener('load', init);
})();
var Mole = (function () {
    function Mole(holes, className) {
        this.allHoles = holes;
        this.className = className;
    }
    Mole.prototype.randomHole = function () {
        var idx = Math.floor(Math.random() * this.allHoles.length);
        var hole = this.allHoles[idx];
        if (hole === this.lastHole) {
            return this.randomHole();
        }
        this.lastHole = hole;
        return hole;
    };
    Mole.prototype.render = function () {
        console.log('molletje #');
        console.log(this.lastHole);
        if (this.lastHole !== undefined) {
            var remLastHole = document.querySelector('.hole' + this.lastHole.getId());
            remLastHole.innerHTML = '';
        }
        var currentHole = this.randomHole();
        var holeElement = document.querySelector('.hole' + currentHole.getId());
        var moleElement = document.createElement('div');
        moleElement.classList.add(this.className, 'up');
        holeElement.appendChild(moleElement);
    };
    return Mole;
}());
//# sourceMappingURL=main.js.map
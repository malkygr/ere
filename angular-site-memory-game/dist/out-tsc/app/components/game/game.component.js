var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { UserService } from '../../shared/services/user-service.service';
import { MemoryGameService } from 'src/app/shared/services/memory-game-service.service';
import { KeyedCollection } from '../../shared/models/game.model';
var GameComponent = /** @class */ (function () {
    function GameComponent(gameService, userService) {
        this.gameService = gameService;
        this.userService = userService;
        this.CardGameDictionary = new KeyedCollection();
        this.listRandomCards = new Array();
        this.isClicked = 0;
        this.isEnd = false;
        this.currentUser = userService.currentUser;
        this.currentPartner = this.userService.partnerUser;
        this.NameNow = this.currentUser.UserName;
        this.listChosenCards = new Array();
    }
    GameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.NameNow = this.gameService.currectTurnUser;
        this.gameService.currectTurnUser = this.currentUser.UserName;
        setInterval(function () {
            _this.gameService.getListOfCards(_this.currentUser).subscribe(function (data) {
                _this.res = data;
                _this.res.CardArray = Object.keys(_this.res.CardArray).map(function (key) { return ({ key: key, value: _this.res.CardArray[key] }); });
                _this.currentUser = _this.userService.currentUser;
                _this.currentPartner = _this.userService.partnerUser;
                _this.NameNow = data["CurrentTurn"];
                _this.CardGameDictionary = data["CardArray"];
                console.log(_this.CardGameDictionary);
                // this.randomCards();
                _this.listRandomCards = _this.res.CardArray;
                var i;
                for (var _i = 0, _a = _this.listRandomCards; _i < _a.length; _i++) {
                    i = _a[_i];
                    if (!i["value"])
                        break;
                }
                if (i["value"])
                    alert("the winner is  " + _this.NameNow + "your score  " + _this.currentUser.Score + " partner score  " + _this.currentPartner.Score);
            }, function (err) {
            });
        }, 5000);
    };
    GameComponent.prototype.randomCards = function () {
        var rand;
        for (var i = 0; i < 18; i++)
            this.listRandomCards[i] = "-1";
        for (var i = 0; i < 18; i++) {
            do {
                this.rand = Math.floor(Math.random() * 17 + 1);
            } while (this.listRandomCards[this.rand] != "-1");
            this.listRandomCards[this.rand] = Object.keys(this.CardGameDictionary)[i];
            do {
                this.rand = Math.floor(Math.random() * 17 + 1);
            } while (this.listRandomCards[this.rand] != "-1");
            console.log(i);
            this.listRandomCards[this.rand] = Object.keys(this.CardGameDictionary)[i];
        }
        console.log("bghgh");
    };
    GameComponent.prototype.clicked = function (card) {
        var _this = this;
        this.isClicked++;
        if (this.isClicked == 1)
            this.listChosenCards[0] = card.key;
        //this.listRandomCards[card.key]= null;
        if (this.isClicked == 2) {
            this.listChosenCards[1] = card.key;
            this.gameService.checkCard(this.listChosenCards).subscribe(function (res) {
                console.log(res);
                if (!res["end"]) //not win
                 {
                    if (_this.listChosenCards[1] == _this.listChosenCards[0])
                        alert("wonderfull");
                    _this.NameNow = res["player"];
                }
                else
                    _this.isEnd = true;
                _this.gameService.getListOfCards(_this.currentUser).subscribe(function (data) {
                    _this.res = data;
                    _this.res.CardArray = Object.keys(_this.res.CardArray).map(function (key) { return ({ key: key, value: _this.res.CardArray[key] }); });
                    _this.NameNow = data["CurrentTurn"];
                    _this.CardGameDictionary = data["CardArray"];
                    console.log(_this.CardGameDictionary);
                    // this.randomCards();
                    _this.listRandomCards = _this.res.CardArray.slice();
                }, function (err) {
                });
            }, function (err) {
                alert("NOT OK");
            });
            this.isClicked = 0;
        }
    };
    GameComponent = __decorate([
        Component({
            selector: 'app-game',
            templateUrl: './game.component.html',
            styleUrls: ['./game.component.css']
        }),
        __metadata("design:paramtypes", [MemoryGameService, UserService])
    ], GameComponent);
    return GameComponent;
}());
export { GameComponent };
//# sourceMappingURL=game.component.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user-service.service';
var MemoryGameService = /** @class */ (function () {
    function MemoryGameService(httpClient, userService) {
        this.httpClient = httpClient;
        this.userService = userService;
        this.URL = "http://localhost:58141/api";
    }
    MemoryGameService.prototype.checkCard = function (listChosenCards) {
        return this.httpClient.put(this.URL + "/updateTurn/" + this.userService.currentUser.UserName, listChosenCards);
    };
    MemoryGameService.prototype.getListOfCards = function (currentUser) {
        return this.httpClient.get(this.URL + "/getGame/" + currentUser.UserName);
    };
    MemoryGameService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, UserService])
    ], MemoryGameService);
    return MemoryGameService;
}());
export { MemoryGameService };
//# sourceMappingURL=memory-game-service.service.js.map
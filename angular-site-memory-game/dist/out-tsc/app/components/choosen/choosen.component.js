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
import { Router } from '@angular/router';
var ChoosenComponent = /** @class */ (function () {
    function ChoosenComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.listChoosePartners = [];
        this.currectUser = this.userService.currentUser;
        console.log("giio" + this.currectUser);
        this.userService.getListPartners();
    }
    ChoosenComponent.prototype.choosePartner = function (user) {
        var _this = this;
        this.userService.partnerUser = user;
        this.userService.choosePartner().subscribe(function (data) {
            _this.router.navigate(['/partner']);
        }, function (err) {
            console.log(err.error);
        });
        console.log(user);
    };
    ChoosenComponent.prototype.ngOnInit = function () {
        var _this = this;
        var inter = setInterval(function () {
            _this.listChoosePartners = _this.userService.listPartners;
            var indexOfUser = _this.listChoosePartners.findIndex(function (i) { return i["UserName"] == _this.currectUser.UserName; });
            if (indexOfUser != -1)
                _this.listChoosePartners.splice(indexOfUser, 1);
            if (_this.userService.currentUser.PartnerName != null) {
                _this.router.navigate(['/partner']);
                clearInterval(inter);
            }
        }, 100);
    };
    ChoosenComponent = __decorate([
        Component({
            selector: 'app-choosen',
            templateUrl: './choosen.component.html',
            styleUrls: ['./choosen.component.css']
        }),
        __metadata("design:paramtypes", [UserService, Router])
    ], ChoosenComponent);
    return ChoosenComponent;
}());
export { ChoosenComponent };
//# sourceMappingURL=choosen.component.js.map
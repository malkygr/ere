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
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
var UserService = /** @class */ (function () {
    function UserService(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
        this.URL = "http://localhost:58141/api";
        this.SubjectUser = new Subject();
    }
    //sent for checking and save new User
    UserService.prototype.registerUserValid = function (newUser) {
        var _this = this;
        this.httpClient.post(this.URL + "/login", newUser).subscribe(function (res) {
            alert("baruch");
            _this.currentUser = newUser;
            _this.router.navigate(['/choosing']);
        }, function (err) {
            alert(err["error"]["Message"]);
        });
        setInterval(function () {
            _this.httpClient.get(_this.URL + "/getUserDetails/" + _this.currentUser.UserName).subscribe(function (data) {
                _this.currentUser = data;
                if (_this.currentUser.PartnerName) {
                    _this.httpClient.get(_this.URL + "/getUserDetails/" + _this.currentUser.PartnerName).subscribe(function (data) {
                        _this.partnerUser = data;
                    });
                }
            });
        }, 5000);
    };
    UserService.prototype.getListOfUser = function () {
        var _this = this;
        this.httpClient.get(this.URL + "/getUsersWaitToPartner").subscribe(function (data) {
            _this.listPartners = data;
            _this.SubjectUser.next(_this.listPartners);
        });
    };
    UserService.prototype.getListPartners = function () {
        var _this = this;
        this.getListOfUser();
        setInterval(function () {
            _this.getListOfUser();
        }, 100);
    };
    UserService.prototype.choosePartner = function () {
        return this.httpClient.put(this.URL + "/ChoosingPartner/" + this.currentUser.UserName, this.partnerUser);
    };
    UserService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, Router])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user-service.service.js.map
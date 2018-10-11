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
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '../../../../node_modules/@angular/router';
import { UserService } from '../../shared/services/user-service.service';
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.title = 'valid data';
        this.obj = Object;
        var formGroupConfig = {
            UserName: new FormControl("", this.createValidatorArr1("username", 2, 10)),
            Age: new FormControl("", this.createValidatorArr2("age", 18, 120))
        };
        this.formGroup = new FormGroup(formGroupConfig);
    }
    //----------------METHODS-------------------
    RegisterComponent.prototype.submitRegisterSave = function () {
        this.userService.registerUserValid(this.formGroup.value);
    };
    RegisterComponent.prototype.createValidatorArr1 = function (cntName, min, max) {
        return [
            function (f) { return !f.value ? { "val": cntName + " is required" } : null; },
            function (f) { return f.value && f.value.length > max ? { "val": cntName + " is max " + max + " chars" } : null; },
            function (f) { return f.value && f.value.length < min ? { "val": cntName + " is min " + min + " chars" } : null; }
        ];
    };
    RegisterComponent.prototype.createValidatorArr2 = function (cntName, min, max) {
        return [
            function (f) { return !f.value ? { "val": cntName + " is required" } : null; },
            function (f) { return !Number(f.value) ? { "val": cntName + " must be number" } : null; },
            function (f) { return f.value && Number(f.value) && f.value > max ? { "val": cntName + " is max " + max + " years" } : null; },
            function (f) { return f.value && Number(f.value) && f.value < min ? { "val": cntName + " is min " + min + " years" } : null; }
        ];
    };
    RegisterComponent = __decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        }),
        __metadata("design:paramtypes", [UserService, Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user-service.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-choosen',
  templateUrl: './choosen.component.html',
  styleUrls: ['./choosen.component.css']
})
export class ChoosenComponent implements OnInit {

  currectUser: User;
  listChoosePartners: User[] = [];
  constructor(public userService: UserService, public router: Router) {

    this.currectUser = this.userService.currentUser;
    console.log("giio" + this.currectUser);
    this.userService.getListPartners();

  }

  choosePartner(user: User) {
    this.userService.partnerUser = user;
    this.userService.choosePartner().subscribe(data => {
      this.router.navigate(['/partner']);
    }, err => {
      console.log(err.error);
    });
    console.log(user);
  }

  ngOnInit() {
    var inter = setInterval(() => {
      this.listChoosePartners = this.userService.listPartners;
      var indexOfUser = this.listChoosePartners.findIndex(i => i["UserName"] == this.currectUser.UserName);
      if (indexOfUser != -1)
        this.listChoosePartners.splice(indexOfUser, 1);
      if (this.userService.currentUser.PartnerName != null) {
        this.router.navigate(['/partner']);
        clearInterval(inter);
        
      }

    }, 100);

  }

}
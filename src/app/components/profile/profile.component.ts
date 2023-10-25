import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { UserDetails, UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  signedIn: boolean;
  signedUser: UserDetails;

  constructor(private userService: UserService, private navBarService: NavbarService) {
    const signedUser = this.userService.getSignedInUser();
    if(signedUser) {
      this.signedIn = true;
      this.signedUser = signedUser;
    } else {
      this.signedIn = false;
      this.signedUser = { email: 'john.wick@continental.com', name: 'John Wick'}
    }    
  }

  ngOnInit(): void {
    this.navBarService.setActive('nav-profile');
  }

}

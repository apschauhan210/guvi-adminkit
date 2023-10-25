import { Component } from '@angular/core';
import { UserDetails, UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

  signedIn: boolean;
  signedUser: UserDetails;

  constructor(private userService: UserService) {
    const signedUser = this.userService.getSignedInUser();
    if(signedUser) {
      this.signedIn = true;
      this.signedUser = signedUser;
    } else {
      this.signedIn = false;
      this.signedUser = { email: 'john.wick@continental.com', name: 'John Wick'}
    }    
  }

  toggleSideBar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar?.classList.contains('collapsed'))
      sidebar.classList.remove('collapsed');
    else
      sidebar?.classList.add('collapsed');
  }
}

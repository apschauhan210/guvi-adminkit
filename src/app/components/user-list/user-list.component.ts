import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  users2: Array<any>;

  constructor(private userService: UserService, private router: Router) {
    this.users2 = this.userService.getUsers2();
  }  

  deleteUser(id: number) {
    console.log(id);
    
    if(window.confirm('Delete user ' + this.userService.getUser2FromId(id).name + "?") && this.userService.deleteUser(id)) {
      this.router.navigateByUrl('/users');
    } else {
      alert("User not deleted!");
    }
  }

}

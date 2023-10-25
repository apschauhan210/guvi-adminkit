import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  constructor(private userService: UserService, private router: Router) {
  }

  userDetails: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(200)
    ]),
    position: new FormControl('', [
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
  })

  onSubmit(): void {
    const userDetail = this.userDetails.value;
    if(this.userService.addUser2(userDetail)) {
      this.router.navigateByUrl('/users')
        .then(() => alert("User addedd successfully!"));
    } else {
      alert("Unable to register!");
    }
  }

  getControl(name: any): AbstractControl | null {
    return this.userDetails.get(name);
  }
}

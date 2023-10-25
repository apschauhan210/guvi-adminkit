import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent  implements OnInit{
  userData: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(150)
    ]),
  })

  constructor(private userService: UserService, private router: Router, private navBarService: NavbarService) { }

  ngOnInit(): void {
    this.navBarService.setActive('nav-signin');
  }

  getControl(name: any): AbstractControl | null {
    return this.userData.get(name);
  }

  onSubmit() {
    const formData = this.userData.value;

    const validUser = this.userService.signin({
      email: formData.email,
      password: formData.password
    }); 

    if(validUser.signedIn) {
      this.router.navigateByUrl('/dashboard').then(() => {
        const signedUserName = document.getElementById('signedUserName');

        if(signedUserName) {
          signedUserName!.innerHTML = validUser.authenticatedName;
        }
        alert("Signed In Successfully");
      });
    } else {
      alert("Invalid Credentials");
    }
  }
}

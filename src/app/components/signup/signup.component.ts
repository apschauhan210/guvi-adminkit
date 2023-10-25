import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userData: FormGroup;

  constructor(private userService: UserService, private router: Router, private navBarService: NavbarService) {
    this.userData = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(200)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(150)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(150)
      ])
    },
    [this.matchPassword()]
    );
  }

  matchPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { passwordMismatchError: true } ;
    }
  }

  ngOnInit(): void {
    this.navBarService.setActive('nav-signup');
  }

  getControl(name: any): AbstractControl | null {
    return this.userData.get(name);
  }

  onSubmit() {
    const formData = this.userData.value;

    const signedUp = this.userService.signup({
      email: formData.email,
      password: formData.password,
      name: formData.name
    });

    if (signedUp.signedUp) {
      this.router.navigateByUrl('/dashboard').then(() => {
        const signedUserName = document.getElementById('signedUserName');

        if (signedUserName) {
          signedUserName!.innerHTML = signedUp.authenticatedName;
        }
        alert("Registerd Successfully");
      })
    } else {
      alert("Unable to Sign Up!");
    }
  }
}

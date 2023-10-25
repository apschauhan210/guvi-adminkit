import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { User2, UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserId: number = 0;
  userDetails: FormGroup;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.userDetails = new FormGroup({
      name: new FormControl(),
      position: new FormControl(),
      address: new FormControl()
    })
  }

  getControl(name: any): AbstractControl | null {
    return this.userDetails.get(name);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.editUserId = Number.parseInt(id);

      const user = this.userService.getUser2FromId(this.editUserId);

      this.userDetails = new FormGroup({
        name: new FormControl(user.name, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200)
        ]),
        position: new FormControl(user.position, [
          Validators.required
        ]),
        address: new FormControl(user.address, [
          Validators.required
        ]),
      })    
    } else {
      alert('Invalid UserId!');
      this.router.navigateByUrl('/users');
    }
  }

  onSubmit(): void {
    if(this.userService.editUser({id: this.editUserId, ...this.userDetails.value})) {
      this.router.navigateByUrl('/users')
        .then(() => alert("Editted Successfully!"));
    }
  }
}

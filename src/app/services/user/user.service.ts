import { Injectable } from '@angular/core';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private signedInUser: UserDetails | null;

  private users: any;
  private users2: Array<any>;

  constructor() {
    this.getUsers();
    this.signedInUser = null;
    const users2String = localStorage.getItem('users2');
    if (users2String)
      this.users2 = JSON.parse(users2String);
    else
      this.users2 = [];
  }

  private getUsers() {
    const usersString = localStorage.getItem('users');

    if (usersString) {
      this.users = JSON.parse(usersString);
    } else {
      this.users = {};
    }
  }

  signin(userData: { email: string, password: string }): { signedIn: boolean, authenticatedName: string } {
    const user: { password: string, name: string } = this.users[userData.email];
    if (user && user.password === userData.password) {
      this.signedInUser = { email: userData.email, name: user.name };
      return { signedIn: true, authenticatedName: user.name };
    }
    return { signedIn: false, authenticatedName: '' };
  }

  signup(userData: { email: string, password: string, name: string }): { signedUp: boolean, authenticatedName: string } {
    try {
      this.users[userData.email] = { password: userData.password, name: userData.name };
      localStorage.setItem('users', JSON.stringify(this.users));
      this.getUsers();
      this.signedInUser = { email: userData.email, name: userData.name };
      return { signedUp: true, authenticatedName: userData.name };
    } catch (error) {
      console.error(error);
      return { signedUp: false, authenticatedName: '' };
    }
  }

  getSignedInUser(): UserDetails | null {
    return this.signedInUser;
  }

  getUsers2(): Array<any> {
    if (this.users2) {
      return this.users2;
    } else {
      return [];
    }
  }

  addUser2(userDetail: { name: string, position: string, address: string }): boolean {
    try {
      var id = 1;
      if (this.users2.length >= 1) {
        id = this.users2.length + 1;
      }
      this.users2.push({ id: id, ...userDetail });
      localStorage.setItem('users2', JSON.stringify(this.users2));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  getUser2FromId(id: number): User2 {
    return this.users2[id-1];
  }

  editUser(user: User2) {
    try {      
      this.users2[user.id-1] = user;
      localStorage.setItem('users2', JSON.stringify(this.users2));
      return true;
    } catch(error) {
      console.error(error);
      return false;
    }
  }

  deleteUser(id: number) {
    try {
      for(let i = id; i < this.users2.length; i++) {
        this.users2[i].id = i;
        this.users2[i-1] = this.users2[i];
      }
      this.users2.pop();
      localStorage.setItem('users2', JSON.stringify(this.users2));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export interface UserDetails {
  email: string,
  name: string
}

export interface User2 {
  id: number,
  name: string,
  position: string,
  address: string
}

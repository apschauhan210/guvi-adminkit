import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  currentActive = document.getElementById('nav-dashboard');

  constructor() { }

  setActive(id: string) {
    if(this.currentActive?.classList.contains('active')) {
      this.currentActive.classList.remove('active');
    }

    this.currentActive = document.getElementById(id);
    this.currentActive?.classList.add('active');
  }
}

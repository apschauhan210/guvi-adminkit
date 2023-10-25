import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'dashboard';

  userData = {
    "apschauhan181@gmail.com": {
      "password": "anuj@123",
      "name": "Anuj Pratap Singh"
    }
  }

  userData2 = [
    {
      id: 1,
      name: 'Anuj Pratap Singh',
      position: 'Technology Intern',
      address: 'Kanpur'
    },
    {
      id: 2,
      name: 'Krishna Modi',
      position: 'Technology Intern',
      address: 'Bhubaneswar'
    },
    {
      id: 3,
      name: 'Vanshita Rohela',
      position: 'Technology Intern',
      address: 'Mathura'
    },
    {
      id: 4,
      name: 'Milind Jha',
      position: 'Technology Intern',
      address: 'Patna'
    },
    
  ]

  ngOnInit(): void {
    localStorage.setItem('users', JSON.stringify(this.userData));
    localStorage.setItem('users2', JSON.stringify(this.userData2));
  }

}

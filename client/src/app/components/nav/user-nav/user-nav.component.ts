import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logOutHandler() {
    // remove session token
    window.sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}

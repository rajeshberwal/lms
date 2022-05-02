import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signInHandler(val: any) {  
    this.authService.signInHandler(val.email, val.password).subscribe(
      (res: any) => {
        // store token in session cookie
        this.authService.setToken(res.token);
        this.router.navigate(['/user/dashboard']);
      }, (err) => {
        console.log(err);
      }
    );
  }
}
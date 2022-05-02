import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signUpHandler(val: any) {  
    this.authService.signUpHandler(val.name, val.email, val.password).subscribe(
      (res) => {
        // if register is successful, navigate to login page
        this.router.navigate(['/login']);
      }, (err) => {
        console.log(err);
      }
    );
  }

}

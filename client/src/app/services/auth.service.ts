import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Get the token from local storage
  getToken() {
    return window.sessionStorage.getItem('token');
  }
  
  // set token in httpOnly cookie
  
  setToken(token: string) {
    window.sessionStorage.setItem('token', token);
  }

  isAdmin() {
    return this.http.get(`https://lms-restapi.herokuapp.com/api/admin/isadmin`);
  }

  // Check if the token available or not
  // ToDo: check if the token is expired or not
  // ToDo: check if the token is valid or not
  // ToDo: store the token more securely
  isLoggedIn() {
    return !!this.getToken();
  }

  // Send a POST request to our login endpoint with the data
  signInHandler(email: string, password: string) {
    return this.http.post('https://lms-restapi.herokuapp.com/api/login', {
      email,
      password
    });
  }

  // Send a POST request to our signup endpoint with the data
  signUpHandler(name: string, email: string, password: string) {
    return this.http.post('https://lms-restapi.herokuapp.com/api/register', {
      name: name,
      email: email,
      password: password
    });
  }
}

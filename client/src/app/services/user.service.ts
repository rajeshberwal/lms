import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  orderHandler(order: any, quantity: number, price: number) {
    return this.http.post(`https://lms-restapi.herokuapp.com/api/user/create/order`, {
      products: order,
      total: quantity,
      price: price
    });
  }
  
  getUser() {
    return this.http.get(`https://lms-restapi.herokuapp.com/api/user`);
  }

  getOrders() {
    return this.http.get(`https://lms-restapi.herokuapp.com/api/user/orders`);
  }
}
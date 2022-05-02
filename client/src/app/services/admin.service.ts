import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllOrder() {
    return this.http.get(`https://lms-restapi.herokuapp.com/api/admin/dashboard/orders`);
  }

  getOrderById(id: any) {
    return this.http.get(`https://lms-restapi.herokuapp.com/api/admin/dashboard/orders/${id}`);
  }

  deleteOrder(id: any) {
    return this.http.delete(`https://lms-restapi.herokuapp.com/api/admin/dashboard/delete/${id}`);
  }

  editStatus(id: any, status: any) {
    return this.http.put(`https://lms-restapi.herokuapp.com/api/admin/dashboard/edit/status/${id}`, {
      status: status
    });
  }
}

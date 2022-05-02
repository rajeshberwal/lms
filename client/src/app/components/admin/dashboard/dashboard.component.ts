import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  data: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllOrder().subscribe((response: any) => {
      this.data = response.orders;
    }
    );
  }

  deleteOrder(id: any) {
    this.adminService.deleteOrder(id).subscribe((response: any) => {
      this.ngOnInit();
    }
    );
  }

  editStatus(id: any, status: any) {
    this.adminService.editStatus(id, status.value).subscribe((response: any) => {
      // console.log(response);
    }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  total: number = 0;
  price: number = 0;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {}

  orderHandler(items: any) {
    for(let item in items) {
      this.total += items[item];
    }
    
    // calculate total price
    this.price += items['shirts'] * 10;
    this.price += items['pants'] * 15;
    this.price += items['jeans'] * 20;
    this.price += items['shorts'] * 10;
    this.price += items['towels'] * 25;
    this.price += items['bedSheets'] * 25;
    this.price += items['covers'] * 35;


    this.userService.orderHandler(items, this.total, this.price).subscribe(
      (response) => {
        this.router.navigate(['/user/dashboard']);
      }
    );
  }
}

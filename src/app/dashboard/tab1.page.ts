import { Component, OnInit, AfterViewChecked, ElementRef } from '@angular/core';
import { MainrouteService } from '../mainroute.service';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  projects: any[];
  designers = [];
  numberOfProjects: number;
  numberOfDesigner: number;
  totalAmountArr = [];
  totalAmount: number;
  totalPaidAmountArr = [];
  totalPaidAmount: number;
  totalProfit: number;

  colorVar;
  backgroundVar;
  userDetailsSections;
  clientSign;

  constructor(private mainservice: MainrouteService, private router: Router, private elementRef:ElementRef) {
    this.userDetailsSections = JSON.parse(localStorage.getItem('locData'));
    console.log(this.userDetailsSections);
    this.clientSign = this.userDetailsSections['email'];
    const fisrtObj = this.clientSign.split('@');
    this.clientSign = fisrtObj[0];
    localStorage.setItem('fullName', this.clientSign);
  }

  ngOnInit() {
    this.mainservice.getAllProjects().pipe(
      map(x => x)
    ).subscribe((d) => {
      this.projects = d;
      console.log(d);
      if (this.projects != undefined) {
        this.numberOfProjects = this.projects.length;
      }
      this.mainservice.getAllDesigners().pipe(
        map(x => x)
      ).subscribe((d) => {
        console.log(d);
        this.designers = d;
        this.numberOfDesigner = this.designers.length;
      })
      this.projects.forEach((d) => {
        this.totalAmountArr.push(d.total_amount);
        this.totalPaidAmountArr.push(d.total_paid);
      })
      
      if( this.totalAmountArr != undefined) {
        this.totalAmount = this.totalAmountArr.reduce((a, b) => {
            return a + b;
        }, 0);
        this.mainservice.totalAmountsProjects(this.totalAmount);
      }
      if( this.totalPaidAmountArr != undefined) {
        this.totalPaidAmount = this.totalPaidAmountArr.reduce((a, b) => {
            return a + b;
        }, 0);
        this.totalProfit = this.totalAmount - this.totalPaidAmount;
        this.mainservice.totalAmountsProfit(this.totalProfit);
      }
    });
    
    this.mainservice.currentThemeData.subscribe((e)=> {
      this.colorVar = e['color'];
      this.backgroundVar = e['background'];
    });

    
    
  }

  
  logOut() {
    this.router.navigate(['/login']);
  }
  
  

}

import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { MainrouteService } from '../mainroute.service';
import { Router } from '@angular/router';



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

  constructor(private mainservice: MainrouteService, private router: Router) {}

  ngOnInit() {
    this.mainservice.getAllProjects().subscribe((d) => {
      this.projects = d;
      if (this.projects != undefined) {
        this.numberOfProjects = this.projects.length;
      }
      this.mainservice.getAllDesigners().subscribe((d) => {
        this.designers = d;
        this.numberOfDesigner = this.designers.length;
      })
      this.projects.forEach((d) => {
        this.totalAmountArr.push(d.total_amount);
      })
      
      if( this.totalAmountArr != undefined) {
        this.totalAmount = this.totalAmountArr.reduce((a, b) => {
            return a + b;
        }, 0);  
      }
    });
    
    
    
  }
  
  

}

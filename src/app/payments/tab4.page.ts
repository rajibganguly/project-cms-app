import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MainrouteService } from '../mainroute.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  private payment : FormGroup;
  projects = [];
  designers = [];
  relivantProjects: any;
  projectListAvail: boolean = true;
  duePayment: number;

  constructor(
    public toastController: ToastController, 
    private mainservice: MainrouteService, 
    private formBuilder: FormBuilder, 
    private router: Router) { 
      this.payment = this.formBuilder.group({
        employeeName: '',
        employeeCode: '',
        projectStatus: '',
        projects: '',        
        projectTotalAmount: '',
        projectTotalBalance: '',
        paidToDesignerAdvance: ['', Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      });
    }

  ngOnInit() {
    this.mainservice.getAllProjects().subscribe((data) => {
      this.projects = data;
    });
    this.mainservice.getAllDesigners().subscribe((data) => {
      this.designers = data;
    })
  }

  getProjectsOfAssignedDesigner(d) {
    console.log(d.target.value, d.target.value['designer_code']);
    this.relivantProjects = []; 
    this.mainservice.getProjectRelatesToDesigner(d.target.value['designer_code']).subscribe((data) => {
      
    console.log(data); 
    if(data !== null) this.relivantProjects = data;
       
      console.log('==============', this.relivantProjects);
      // if (this.relivantProjects.length > 0) {
      //   this.projectListAvail = false; 
      // }
      // else {
      //   this.projectListAvail = true;

      // }
      console.log('44444444444444', this.projectListAvail); 

      this.duePayment = this.relivantProjects[0].total_due;
      
      this.payment.value.projects.reset();
    });
    
  }

  doPayForm(){
    const createPayments = {
      designer: this.payment.value.employeeName.designer,
      designer_code: this.payment.value.employeeName.designer_code,
      type: this.payment.value.projects.project_status,
      project: this.payment.value.projects.projects_name, 
      total_amount: this.payment.value.projects.total_amount,
      total_paid: this.payment.value.projects.total_paid,
      date_of_register: this.payment.value.employeeName.designer_reg_date,
      paid_to_designer: this.payment.value.paidToDesignerAdvance
    }
    console.log(this.payment.value.paidToDesignerAdvance);
    console.log(this.duePayment);
    if(this.payment.value.paidToDesignerAdvance > this.duePayment) {
      console.log('please check again your calculations');
    }
    else {
      this.mainservice.postPaymentsAll(createPayments);
      console.log(createPayments)
      this.router.navigate(['../']);
    }
    this.payment.reset();
    
  }

}


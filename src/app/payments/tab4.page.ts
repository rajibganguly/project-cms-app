import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MainrouteService } from '../mainroute.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  private payment: FormGroup;
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
      employeeName: ['', Validators.required],
      employeeCode: [''],
      projects: ['', Validators.required],
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
    console.log(d.target.value['id']);
    this.relivantProjects = [];
    this.mainservice.getProjectRelatesToDesigner(d.target.value['designer_code']).subscribe((data) => {
      if (data !== null) this.relivantProjects = data;
      console.log(this.relivantProjects[0]);
      if (this.relivantProjects.length > 0) this.duePayment = this.relivantProjects[0].total_due;
      // this.payment.value.projects.reset();
    });

  }

  doPayForm() {

    const createPayments = {
      id: this.relivantProjects[0].id,
      designer: this.payment.value.employeeName.designer,
      designer_code: this.payment.value.employeeName.designer_code,
      reward: this.payment.value.employeeName.reward,
      designer_reg_date: this.payment.value.employeeName.designer_reg_date,
      earned: this.payment.value.employeeName.earned,
      project: this.payment.value.projects,
      total_amount: this.relivantProjects[0].total_amount,
      total_paid: this.relivantProjects[0].total_paid,
      paid_to_designer: this.payment.value.paidToDesignerAdvance
    }
    console.log(this.payment.value);
    this.mainservice.putPaymentsAll(createPayments);
    console.log(createPayments)
    this.router.navigate(['/']);



    this.payment.reset();

  }

}


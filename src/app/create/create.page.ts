import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MainrouteService } from '../mainroute.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  private createProjectGroup : FormGroup;
  projects = []
  designers = [];
  
  constructor( public toastController: ToastController, private mainservice: MainrouteService, private formBuilder: FormBuilder, private router: Router ) {
    this.createProjectGroup = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectCode: ['', Validators.required],
      projectStatus: ['', Validators.required],
      projectType: ['', Validators.required],
      designerName: ['',  Validators.required],
      projectDescription: [''],
      projectDate: ['', Validators.required],
      projectTotalAmount: ['', Validators.required],
      projectTotalPaid: ['', Validators.required],
      paidToDesigner: ['', Validators.required]
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


  logForm(){    
    const createProject = {
      projects_name: this.createProjectGroup.value.projectName,
      projects_code: this.createProjectGroup.value.projectCode,
      project_type: this.createProjectGroup.value.projectStatus,
      total_amount: this.createProjectGroup.value.projectTotalAmount,
      total_due: (this.createProjectGroup.value.projectTotalAmount) - (this.createProjectGroup.value.projectTotalPaid),
      total_paid: this.createProjectGroup.value.projectTotalPaid,
      project_started: false,
      date_of_register: this.createProjectGroup.value.projectDate,
      project_status: null,
      designer: this.createProjectGroup.value.designerName,
      paid_to_designer: this.createProjectGroup.value.paidToDesigner,
      fullname: localStorage.getItem('fullName')
    }
    console.log(createProject);
    this.mainservice.postNewProject(createProject);
    this.router.navigate(['../']);
    this.createProjectGroup.reset();
  }

}

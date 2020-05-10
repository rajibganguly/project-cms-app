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
  private todo : FormGroup;
  projects = []
  designers = [];
  
  constructor( public toastController: ToastController, private mainservice: MainrouteService, private formBuilder: FormBuilder, private router: Router ) {
    this.todo = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectStatus: ['', Validators.required],
      projectType: ['', Validators.required],
      designerName: [''],
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
      console.log(this.designers);
    })
    
  }


  logForm(){
    
    const createProject = {
      projects_name: this.todo.value.projectName,
      project_type: this.todo.value.projectStatus,
      total_amount: this.todo.value.projectTotalAmount,
      total_due: (this.todo.value.projectTotalAmount) - (this.todo.value.projectTotalPaid),
      total_paid: this.todo.value.projectTotalPaid,
      date_of_register: this.todo.value.projectDate,
      project_status: null,
      designer: this.todo.value.designerName,
      paid_to_designer: this.todo.value.paidToDesigner
    }
    this.mainservice.postNewProject(createProject);
    console.log(createProject)
    this.router.navigate(['../']);
  }

}

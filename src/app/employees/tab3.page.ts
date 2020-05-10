import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MainrouteService } from '../mainroute.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  private employe : FormGroup;
  designers = [];
  
  constructor( public toastController: ToastController, private mainservice: MainrouteService, private formBuilder: FormBuilder, private router: Router ) {
    this.employe = this.formBuilder.group({
      employeeName: ['', Validators.required],
      employeeCode: ['', Validators.required],
      rewardPoint: [''], 
      employeeDate: [],
      earned: ['']
    });
  }

  ngOnInit() {
    this.mainservice.getAllDesigners().subscribe((data) => {
      this.designers = data;
      console.log(this.designers);
    })
    
  }


  addEmpForm(){
    
    const regDesigner = {
      designer: this.employe.value.employeeName,
      designer_code: this.employe.value.employeeCode,
      reward: this.employe.value.rewardPoint,
      designer_reg_date: this.employe.value.employeeDate,
      earned: this.employe.value.earned
    }
    this.mainservice.registerNewDesigners(regDesigner);
    console.log(regDesigner)
    this.router.navigate(['../']);
  }

  deleteEmployee(x) {
    console.log(x)
  }

}








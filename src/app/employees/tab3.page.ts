import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { ToastController, AlertController, ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { MainrouteService } from '../mainroute.service';
import { EmployeePaymentComponent } from '../employee-payment/employee-payment.component';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  private employe : FormGroup;
  designers = [];

  flagEmployeeList = true;
  flagEmploeeForm = false;

  colorVar;
  backgroundVar;
  
  constructor( public toastController: ToastController, public alertCtrl: AlertController, private mainservice: MainrouteService, private formBuilder: FormBuilder, private router: Router ) {
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

    this.mainservice.currentThemeData.subscribe((e)=> {
      this.colorVar = e['color'];
      this.backgroundVar = e['background'];
    });
    
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
    this.router.navigate(['../']);
    this.employe.reset();
  }

  showEmployeeForm() {
    this.flagEmployeeList = false;
    this.flagEmploeeForm = true;
  }

  employeeFormCancel() {
    console.log('cancel')
    this.flagEmployeeList = true;
    this.flagEmploeeForm = false;
  }

  deleteEmployee(x) {
    const messages = `${x.designer} is associated with some project, so asked to administrator.`;
    this.alertCtrl.create({
      header: "Want to delete employee?",
      message: messages,
      buttons: [{
        text: "Agreed",
        handler: () => {
          console.log("not possible delete")
        }
      }, {
        text: "Cancel",
        role: "Cancel"
      }]
    }).then((e) => {
      e.present();
    })
    // alert(messages);
    console.log(x);
  }

 
  

}








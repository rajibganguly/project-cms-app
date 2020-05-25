import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MainrouteService } from '../mainroute.service';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private register : FormGroup;
  spinnerShow: boolean = false;
  constructor( public toastController: ToastController, private authService: FirebaseAuthService, private mainservice: MainrouteService, private formBuilder: FormBuilder, private router: Router ) {
    this.register = this.formBuilder.group({
      signinemail: ['', [Validators.email, Validators.required]],
      signinpassword: ['', [Validators.minLength(6), Validators.required]]
    });
  }

  ngOnInit() {
  }

  async doRegister(){
    
    const signup = {
      username: this.register.value.signinemail,
      password: this.register.value.signinpassword
    }
    console.log(this.register);
  
    try {
      this.spinnerShow = true;
      const result = await this.authService.registerWithEmailPassword(signup.username, signup.password);
      return result;
      this.spinnerShow = false;
    } catch(error) {
      throw new Error(error);
    }
    this.register.reset();
  }

}






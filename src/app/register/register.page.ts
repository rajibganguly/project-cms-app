import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  pageMessage: string;
  regPage: boolean = true;
  regForm: FormGroup;
  loader: boolean = true;
  validation_messages = {
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 8 characters long.' },
      { type: 'maxlength', message: 'Password cannot be more than 32 characters long.' }
    ],
  'phonenumber': [
      { type: 'required', message: 'Phone number is required.' },
      { type: 'minlength', message: 'Phone number must be at least 10 characters long.' },
      { type: 'maxlength', message: 'Phone number cannot be more than 10 characters long.' },
      { type: 'pattern', message: 'This phone number not correct.' },
      { type: 'validUsername', message: 'This phone number has already been taken.' }
    ],
  'emailid': [
      { type: 'required', message: 'Email id is required.' },
      { type: 'pattern', message: 'Your email is not valid email, please check.' }
    ]
  }

   constructor(
    private fb: FormBuilder, 
    // private af: AngularFireAuth, 
    // private afs: AngularFirestore,
    private authservice: AuthService,
    private route: Router
   ) {
    this.regForm = this.fb.group({
      emailId: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
      ])],
      password: ['', Validators.compose([
        Validators.maxLength(32),
        Validators.minLength(8),
        Validators.required
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$') //this is for the letters (both uppercase and lowercase) and numbers validation
     ])]
    });
   }

   ngOnInit() {
    this.authservice.obsMessage.subscribe(data => {
      this.pageMessage = data.split('_').join(' ');
      this.loader = true;
    })
  }

  // login form
  regFormValue() {
    this.authservice.signUpWithEmailPassword(this.regForm.value.emailId, this.regForm.value.password);
    this.regForm.reset();
    this.route.navigate(['/login']);
  }

  loginPage() {
    this.route.navigate(['/login']);
  }


}






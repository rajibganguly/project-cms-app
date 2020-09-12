import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';

const mess = "";

export interface RegisteredInfo {
  registered?: boolean;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  webApi = 'AIzaSyD2n6161pqD-mHm4ZRtrfd6KKcDPoQpe_Q';
  localdetails = localStorage.getItem('locData');
  localdetailsJson = JSON.parse(this.localdetails);
  private messages = new BehaviorSubject<string>(mess);
  obsMessage = this.messages.asObservable();


  constructor(private http: HttpClient, private route: Router) {}


  // signup
  signUpWithEmailPassword(email: string, password: string) {
    const emailpass = {
      email: email,
      password: password
    }
    console.log(emailpass);
    console.log(this.localdetailsJson);
    if(this.localdetailsJson === null) {
      this.http.post<any[]>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.webApi}`, emailpass).pipe(
        map(x => x)
      ).subscribe((response) => {
        const localdata = {
          "idToken": response['idToken'],
          "email": response['email'],
          "refreshToken": response['refreshToken'],
          "expiresIn": response['expiresIn'],
          "localId": response['localId'],
          "registerd": true
        }
        localStorage.setItem('locData', JSON.stringify(localdata));
        console.log(response);
        this.route.navigate(['/login']);

      }, (error) => {
        console.log(error);
        this.updatedDataSelection(error.error.error.message);
        this.route.navigate(['/register']);
      })
    } else {
      this.updatedDataSelection('You_already_registered_with_some_email._Please_contact_admin.');
      this.route.navigate(['/register']);
    }

    
    
  }


  // Login

  loginWithUserEmailPassword(email: string, password: string) {
    const emailpass = {
      email: email,
      password: password
    }
    return this.http.post<any[]>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.webApi}`, emailpass).pipe(
      map(x => x)
    ).subscribe((response) => {
      // this.route.navigate(['/tabs']);

    }, (error) => {
      console.log(error.error);
      this.updatedDataSelection(error.error.error.message);
    })
    
  }

  updatedDataSelection(messagesTxt: string){
    this.messages.next(messagesTxt);
  }


  



}

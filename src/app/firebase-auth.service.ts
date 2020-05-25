import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private ngfireauth: AngularFireAuth) {

   }

   async registerWithEmailPassword(email, password) {
     try {
      const result = await this.ngfireauth.createUserWithEmailAndPassword(email, password);
      // await this.ngfireauth.currentUser.sendEmailVerification();
      return result;
     } catch(error) {
       throw new Error(error);
     }
   }
}

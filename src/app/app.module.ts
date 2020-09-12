import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LoaderComponent } from './loader.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from "./auth.service";




@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule

  ],
  providers: [
    StatusBar,
    AuthService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: SETTINGS.toString, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

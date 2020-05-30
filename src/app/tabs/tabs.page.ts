import { Component } from '@angular/core';
import { MainrouteService } from '../mainroute.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  colorVar;
  backgroundVar;

  constructor(private mainservice: MainrouteService) {}

  themeChecker(ev) {
    if(ev.detail.checked === true) {      
      this.colorVar = this.mainservice.darkTheme.colorVar;
      this.backgroundVar = this.mainservice.darkTheme.backgroundVar;
      const constData = {
        color: this.colorVar,
        background: this.backgroundVar
      }
      this.mainservice.currentThemeData.next(constData);
    } else {
      this.colorVar = this.mainservice.defaltTheme.colorVar;
      this.backgroundVar = this.mainservice.defaltTheme.backgroundVar;
      const constData = {
        color: this.colorVar,
        background: this.backgroundVar
      }
      this.mainservice.currentThemeData.next(constData);
    }
  }

}

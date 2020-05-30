import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreatePage } from './../create/create.page';

import { MainrouteService } from './../mainroute.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  projects = []
  designers = [];

  colorVar;
  backgroundVar;
  

  constructor(private mainservice: MainrouteService, private router: Router) {}

  ngOnInit() {
    return this.mainservice.getAllProjects().subscribe((data) => {
      this.projects = data;
      this.mainservice.currentThemeData.subscribe((e)=> {
        this.colorVar = e['color'];
        this.backgroundVar = e['background'];
      });
    });

    
    
  }

  // drop(ev) {
  //   ev.preventDefault();
  //   var data = ev.dataTransfer.getData("text");
  //   ev.target.appendChild(document.getElementById(data));
    
  // }

  // allowDrop(ev) {
  //   ev.preventDefault();
  // }

  // drag(ev) {
  //   ev.dataTransfer.setData("text", ev.target.id);
    
  // }
  themeChecker(ev) {
    console.log(ev.detail.checked)
    if(ev.detail.checked === true) {
      this.colorVar = this.mainservice.darkTheme.colorVar;
      this.backgroundVar = this.mainservice.darkTheme.backgroundVar;
    } else {
      this.colorVar = this.mainservice.defaltTheme.colorVar;
      this.backgroundVar = this.mainservice.defaltTheme.backgroundVar;
    }
  }

  details(row:object) {
    this.mainservice.projectsUpworks(row);
    this.router.navigate(['/']);
    location.reload();
  }

  
}

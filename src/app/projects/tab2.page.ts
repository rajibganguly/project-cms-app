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
  constructor(private mainservice: MainrouteService, private router: Router) {}

  ngOnInit() {
    return this.mainservice.getAllProjects().subscribe((data) => {
      this.projects = data;
    });
    
  }

  details(row:object) {
    console.log(row);
  }

  
}

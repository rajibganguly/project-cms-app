import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainrouteService {

  // data as received
  projects = environment.databaselink + 'projects';
  designers = environment.databaselink + 'designers';

  constructor(private http: HttpClient) { }

  getAllProjects() {
    return this.http.get<any>(this.projects +'/');
  }

  postNewProject(data: object) {
    return this.http.post<any>(this.projects, data).subscribe((data)=> {
      console.log(data);
    }, (error) => {
      console.log(error)
    });
  }

  getAllDesigners() {
    return this.http.get<any>(this.designers);
  }
}

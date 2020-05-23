import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MainrouteService {

  // data as received
  projects = environment.databaselink + 'projects';
  designers = environment.databaselink + 'designers';
  payments = environment.databaselink + 'payments';
  amounts = environment.databaselink + 'amount';

  constructor(private http: HttpClient) { }

  // set for store edit employee
  public editEmployeeArr: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  editEmployee$: Observable<any> = this.editEmployeeArr.asObservable();

  

  // GET ALL PROJECTS
  getAllProjects() {
    return this.http.get<any>(this.projects +'/');
  }

  // POST A NEW PROJECT
  postNewProject(data: object) {
    return this.http.post<any>(this.projects, data).subscribe((data)=> {
      console.log(data);
    }, (error) => {
      console.log(error)
    });
  }

  // GET ALL DESIGNERS
  getAllDesigners() {
    return this.http.get<any>(this.designers +'/');
  }

  // DELETE DESIGNER/S
  deleteDesigner(id: number): Observable<any>{
    return this.http.delete<any>(`${this.designers}/${id}`);
  }

  // TOTAL AMOUNT
  totalAmountsProjects(data: number) {
    return this.http.patch(`${this.amounts}/1`, {'total_amount_projects': data}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'        
      })
    }).subscribe(
      (success) => console.log(success),
      (error) => console.log(error)
    );
  }
  // TOTAL PAID AMOUNT
  totalAmountsProfit(data: number) {
    return this.http.patch(`${this.amounts}/1`, {'total_amount_profit': data}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'        
      })
    }).subscribe(
      (success) => console.log(success),
      (error) => console.log(error)
    );
  }

  // ADD NEW DESIGNER
  registerNewDesigners(data: object) {
    return this.http.post<any>(this.designers, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'        
      })
    }).subscribe(
      (data)=> console.log(data), 
      (error) => console.log(error)
      );
  }

  // GET PROJECT RELATED TO ID
  getProjectRelatesToDesigner(id: number) {
    return this.http.get(this.projects + '?designer=' + id);
  }

  // PAYMENTS TO DESIGNER/S
  putPaymentsAll(obj: any) {

      console.log(obj);
      return this.http.put(`${this.designers}/${obj.id}`, obj, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'        
        })
      }).subscribe(
        (success) => console.log(success),
        (error) => console.log(error)
      );
   
  }

 

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseURL : string = "localhost:8001/student";

  constructor(private http:HttpClient) { }

  createStudent(student: any): Observable<any> {
    return this.http.post(`${this.baseURL}/add`, student);
  }
  

}

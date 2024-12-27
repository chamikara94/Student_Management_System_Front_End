import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentRepresentation } from './modules/student-representation';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseURL: string = "http://localhost:8001/student";

  constructor(private http: HttpClient) {}

  saveStudent(student: StudentRepresentation): Observable<any> {
    return this.http.post(`${this.baseURL}/add`, student);
  }
  getAllStudents(): Observable<StudentRepresentation[]> {
    return this.http.get<StudentRepresentation[]>(`${this.baseURL}/getallstudents`);
  }
  getStudentByIndexNo(indexNo: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/index/${indexNo}`);
  }
  deleteStudent(indexNo: string,options?:any): Observable<any> {
    return this.http.delete(`${this.baseURL}/delete/index/${indexNo}`, options);
  }
  updateStudent(indexNo: string, student: StudentRepresentation): Observable<any> {
    return this.http.put(`${this.baseURL}/update/index/${indexNo}`, student);
  }
}

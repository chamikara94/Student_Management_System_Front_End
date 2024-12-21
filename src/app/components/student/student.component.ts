import { Component } from '@angular/core';
import { StudentRepresentation } from '../services/modules/student-representation';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  standalone: false,
  
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  studentObj:StudentRepresentation = {};

  constructor ( private studentService : StudentService){

  }

  ngOnInit(): void {
    
  }

  saveStudent():void{
    this.studentService.createStudent(this.studentObj).subscribe({
      next:(result):void=>{
        console.log(result);
      }
    })
  }
}

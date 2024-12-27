import { Component, OnInit } from '@angular/core';
import { StudentRepresentation } from '../services/modules/student-representation';
import { StudentService } from '../services/student.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-student',
  standalone: false,
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  studentObj: StudentRepresentation = {};

  constructor(private studentService: StudentService, 
    private datePipe: DatePipe, 
    private router: Router,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Student Registration');
  }

  saveStudent(): void {

    if (!this.studentObj.index_no || !this.studentObj.first_Name || !this.studentObj.last_Name || !this.studentObj.gender || !this.studentObj.dateofbirth || !this.studentObj.gpa) {
      Swal.fire('Error', 'Please fill in all required fields', 'warning');
      return;
    }

    const dateOfBirth = this.studentObj.dateofbirth;
    if (dateOfBirth) {
      const selectedDate = new Date(dateOfBirth);
      const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');
      this.studentObj.dateofbirth = formattedDate ? formattedDate : '';
    }

    this.studentService.saveStudent(this.studentObj).subscribe({
      next: (response: any) => {
        Swal.fire('Success', 'Student saved successfully', 'success');
      },
      error: (error: any) => {
        Swal.fire('Error', 'Student is already added', 'error');
      }
    });

  }

  confirmCancel(): void {
        Swal.fire({
          title: 'Do you want to exit ?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            this.CancelStudent();
          }
        });
      }
  
  CancelStudent(): void {
    this.router.navigate(['']);
  }
}
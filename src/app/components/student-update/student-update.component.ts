import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student.service'; 
import { StudentRepresentation } from '../services/modules/student-representation';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-student-update',
  standalone: false,
  
  templateUrl: './student-update.component.html',
  styleUrl: './student-update.component.css'
})
export class StudentUpdateComponent implements OnInit {
  studentObj: StudentRepresentation = {};

  constructor(
    private studentService: StudentService, 
    private datePipe: DatePipe, 
    private route: ActivatedRoute, 
    private router: Router,
    private titleService: Title, 
  
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const indexNo = params['indexNo'];
      this.loadStudent(indexNo);
    });
    this.titleService.setTitle('Student Update');
  }

  loadStudent(indexNo: string): void {
    this.studentService.getStudentByIndexNo(indexNo).subscribe(data => {  
      this.studentObj = data;
    });
  }

  updateStudent(): void {
    const dateOfBirth = this.studentObj.dateofbirth;
    if (dateOfBirth) {
      const selectedDate = new Date(dateOfBirth);
      const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');
      this.studentObj.dateofbirth = formattedDate ? formattedDate : '';
    }

    this.studentService.updateStudent(this.studentObj.index_no as string, this.studentObj).subscribe({
      next: (response: any) => {
        Swal.fire('Success', 'Student updated successfully', 'success');
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        Swal.fire('Error', 'Unable to update', 'error');
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

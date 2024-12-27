import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service'; 
import { StudentRepresentation } from '../services/modules/student-representation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class StudentListComponent implements OnInit {
  students: StudentRepresentation[] = [];
  searchIndexNo: string = '';

  constructor(private studentService: StudentService,
    private router: Router,
    private titleService: Title, 
  ) {}

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(data => {
      this.students = data;
    });
    this.titleService.setTitle('Student Management System');
  }
  searchStudent(indexNo: string): void {
    if (!indexNo) {
      this.studentService.getAllStudents().subscribe({
        next: (data: any) => {
          this.students = data;
        },
        error: (error: any) => {
          Swal.fire('Error', 'Failed to fetch students', 'error');
        }
      });
      return;
    }
  
    this.studentService.getStudentByIndexNo(indexNo).subscribe({
      next: (data: any) => {
        if (data) {
          this.students = [data];
        } else {
          Swal.fire('Error', 'Student not found', 'error');
        }
      },
      error: (error: any) => {
        Swal.fire('Error', 'Index Number Not found', 'error');
      }
    });
  }
 
  deleteStudent(indexNo: string | undefined): void {
    if(!indexNo) {
      return;
    }
    Swal.fire({
      title: 'Are you sure you want to delete this student?',
      showCancelButton: true,
      confirmButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(indexNo, { responseType: 'text' }).subscribe({
          next: (data: any) => {
            Swal.fire('Success', 'Student deleted successfully', 'success');
            this.students = this.students.filter((student) => student.index_no !== indexNo);
          },
          error: (error: any) => {
            Swal.fire('Error', 'Failed to delete student', 'error');
          }
        });
      }
    });
  }

  editStudent(index: string | undefined): void {
    this.router.navigate(['/edit', index]);
  }

  AddStudent() {
    this.router.navigate(['/add']);
  }

}

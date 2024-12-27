import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { StudentComponent } from './components/student/student.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentService } from './components/services/student.service'; 

import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { StudentUpdateComponent } from './components/student-update/student-update.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    StudentUpdateComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    NgbModule,
    RouterModule,
    CommonModule,
    StudentListComponent
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }

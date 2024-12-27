import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentUpdateComponent } from './components/student-update/student-update.component';
import { DatePipe } from '@angular/common';

const routes: Routes = [
  {path : '',component : StudentListComponent},
  {path : 'add',component : StudentComponent},
  {path: 'edit/:indexNo', component: StudentUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [DatePipe],
})
export class AppRoutingModule { }
export class AppModule {}

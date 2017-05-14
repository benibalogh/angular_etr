import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { LoginModule } from './login.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { HighlightDirective } from './_directives/highlight.directive';

import { AppComponent } from './app.component';
import { GetDataService } from './getdata/get-data.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExamsComponent } from './exams/exams.component';
import { CoursesComponent } from './courses/courses.component';
import { FinancesComponent } from './finances/finances.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { TeachersComponent } from './teachers/teachers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GivenNamePipe } from './_pipes/given-name.pipe';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'my-courses', component: MyCoursesComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'finances', component: FinancesComponent },
      { path: 'exams', component: ExamsComponent },
      { path: 'classrooms', component: ClassroomsComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    PageNotFoundComponent,
    ExamsComponent,
    CoursesComponent,
    FinancesComponent,
    MyCoursesComponent,
    ClassroomsComponent,
    TeachersComponent,
    DashboardComponent,
    GivenNamePipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    LoginModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 300 }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

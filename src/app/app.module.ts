import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { GetDataService } from './getdata/get-data.service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExamsComponent } from './exams/exams.component';
import { CoursesComponent } from './courses/courses.component';
import { FinancesComponent } from './finances/finances.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GivenNamePipe } from './_pipes/given-name.pipe';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'my-courses', component: MyCoursesComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'finances', component: MyCoursesComponent },  // placeholder component
      { path: 'exams', component: ExamsComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  { path: 'register', component: RegisterComponent},
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
    LoginComponent,
    PageNotFoundComponent,
    ExamsComponent,
    CoursesComponent,
	FinancesComponent,
    MyCoursesComponent,
    DashboardComponent,
    GivenNamePipe,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 300 }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

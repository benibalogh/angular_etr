import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { LoginModule } from './login.module';
import { DataModule } from './data.module';

import { HighlightDirective } from './_directives/highlight.directive';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExamsComponent } from './exams/exams.component';
import { CoursesComponent } from './courses/courses.component';
import { FinancesComponent } from './finances/finances.component';
import { PaymentsComponent } from './payments/payments.component';
import { ScholarshipsComponent } from './scholarships/scholarships.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GivenNamePipe } from './_pipes/given-name.pipe';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuardService } from './_guards/auth-guard.service';
import { AuthService } from './auth.service';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        children: [
          { path: 'my-courses', component: MyCoursesComponent },
          { path: 'courses', component: CoursesComponent },
          {
            path: 'finances',
            component: FinancesComponent,
            children: [
              { path: 'payments', component: PaymentsComponent },
              { path: 'scholarships', component: ScholarshipsComponent }
            ]
          },
          { path: 'exams', component: ExamsComponent },
          { path: 'static', loadChildren: './static.module#StaticModule' },
          { path: 'profile', component: ProfileComponent }
        ]
      }
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
    PaymentsComponent,
    ScholarshipsComponent,
    MyCoursesComponent,
    DashboardComponent,
    GivenNamePipe,
    ProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    LoginModule,
    DataModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

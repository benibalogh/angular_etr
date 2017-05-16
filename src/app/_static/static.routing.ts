import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeachersComponent } from '../teachers/teachers.component';
import { ClassroomsComponent } from '../classrooms/classrooms.component';

const routes: Routes = [
  { path: 'teachers', component: TeachersComponent },
  { path: 'classrooms', component: ClassroomsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

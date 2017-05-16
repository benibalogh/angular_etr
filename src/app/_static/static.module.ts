import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './static.routing';

import { TeachersComponent } from '../teachers/teachers.component';
import { ClassroomsComponent } from '../classrooms/classrooms.component';

@NgModule({
  declarations: [
    TeachersComponent,
    ClassroomsComponent
  ],
  imports: [
    CommonModule,
    routing
  ],
  exports: [
    TeachersComponent,
    ClassroomsComponent
  ]
})
export class StaticModule { }

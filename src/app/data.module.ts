import { NgModule } from '@angular/core';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { GetDataService } from './getdata/get-data.service';
import { NameService } from './name.service';

@NgModule({
  imports: [
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 300 }),
  ],
  providers: [ GetDataService, NameService ]
})
export class DataModule { }

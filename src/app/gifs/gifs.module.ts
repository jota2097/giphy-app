import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [GifsPageComponent, SearchComponent, ListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  exports: [GifsPageComponent]
})
export class GifsModule { }

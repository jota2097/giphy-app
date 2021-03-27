import { NgModule } from '@angular/core';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    MatPaginatorModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule
  ],
  exports: [
    MatPaginatorModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule
  ]
})
export class MaterialModule { }
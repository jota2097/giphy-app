import { Component, OnInit } from '@angular/core';
import { SearchGifsResponse } from '../Model/Interface/gifs.interface';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-gifs-page',
  templateUrl: './gifs-page.component.html',
  styles: [
  ]
})
export class GifsPageComponent implements OnInit {

  public selectedTabIndex: number = 0;
  public searchData: SearchGifsResponse | undefined;
  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
    this.searchData = this.gifsService.gifsResults;
  }
  onChangeSelectionIndex(index: number): void {
    this.selectedTabIndex = index;
  }
}

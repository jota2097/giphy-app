import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SearchGifsResponse } from '../Model/Interface/gifs.interface';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  constructor(private gifsService: GifsService) { }
  @Input() selectedTabIndex: number = 0;
  public limitApiOffset: number = 4990;

  ngOnInit(): void {
    this.gifsService.searchTrending();
  }

  get results(): SearchGifsResponse {
    return this.gifsService.gifsResults;
  }

  get resultsTrending(): SearchGifsResponse {
    return this.gifsService.trendingResults;
  }

  handlePageEvent(event: PageEvent) {
    this.gifsService.searchGifs(localStorage.getItem('query')!, this.getOffset(event), event.pageSize);
  }

  getOffset(event: PageEvent) {
    let currentOffset = this.gifsService.gifsResults.pagination.offset;
    if (event.pageIndex === 0) return 0;
    if (event.pageIndex >= event.previousPageIndex!) {
      currentOffset += event.pageSize;
      if (currentOffset >= this.limitApiOffset) return this.limitApiOffset;
      return currentOffset;
    }
    if (event.pageIndex < event.previousPageIndex!) return currentOffset - event.pageSize;

    return 0;
  }
}

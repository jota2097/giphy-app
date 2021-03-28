import { Component, OnInit } from '@angular/core';
import { SearchGifsResponse } from '../Model/Interface/gifs.interface';
import { GifsService } from '../services/gifs.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-gifs-page',
  templateUrl: './gifs-page.component.html',
  styles: [
  ]
})
export class GifsPageComponent implements OnInit {

  public selectedTabIndex: number = 0;
  private limitApiOffset: number = 4990;
  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
    this.gifsService.searchTrending();
    this.gifsService.searchStickers();
  }

  onChangeSelectionIndex(index: number): void {
    this.selectedTabIndex = index;
  }

  getSearchResults(): SearchGifsResponse {
    return this.gifsService.gifs;
  }

  getTrendingGifs(): SearchGifsResponse {
    return this.gifsService.trendingGifs;
  }
  getTrendingStickers(): SearchGifsResponse {
    return this.gifsService.trendingStickers;
  }

  search(event: PageEvent): void {

    switch (this.selectedTabIndex) {
      case 0:
        this.gifsService.searchGifs(localStorage.getItem('query')!, this.getOffset(event, this.gifsService.gifs.pagination.offset), event.pageSize);
        break;
      case 1:
        this.gifsService.searchTrending(this.getOffset(event, this.gifsService.trendingGifs.pagination.offset), event.pageSize);
        break;
      case 2:
        this.gifsService.searchStickers(this.getOffset(event, this.gifsService.trendingStickers.pagination.offset), event.pageSize);
        break;
    }
  }

  getOffset(event: PageEvent, currentOffset: number): number {

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

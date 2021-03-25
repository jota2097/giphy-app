import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  constructor(private gifsService: GifsService) { }
  searchCtriteria: string = '';

  ngOnInit(): void {
  }

  Search(): void {

    if (this.searchCtriteria.trim().length === 0) return;

    this.gifsService.searchGifs(this.searchCtriteria.trim().toLocaleLowerCase());
    this.Clear();
  }

  Clear(): void {
    this.searchCtriteria = '';
  }
}

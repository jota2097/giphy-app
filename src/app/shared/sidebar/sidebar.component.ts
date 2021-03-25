import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  getSearchRecords(): string[] {
    return this.gifsService.getLastWantedGifs;
  }

  search(query: string): void {
    this.gifsService.searchGifs(query);
  }
}

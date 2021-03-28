import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SearchGifsResponse } from '../Model/Interface/gifs.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  constructor() { }

  @Input() dataGifs: SearchGifsResponse = {} as SearchGifsResponse;
  @Output() search = new EventEmitter<PageEvent>();

  ngOnInit(): void { }

  handlePageEvent(event: PageEvent): void {
    this.search.emit(event);
  }
}

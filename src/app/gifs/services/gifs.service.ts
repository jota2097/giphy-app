import { Injectable } from '@angular/core';
import { apiKey } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../Model/Interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiUrl = 'https://api.giphy.com/v1/gifs';
  private limit = 10;
  private lastWantedGifs: string[] = [];
  public gifsResults: SearchGifsResponse;


  constructor(private http: HttpClient) {
    this.lastWantedGifs = JSON.parse(localStorage.getItem('lastWantedGifs')!) || [];
    this.gifsResults = JSON.parse(localStorage.getItem('gifsResults')!) || [];
  }

  get getLastWantedGifs(): string[] {
    return [...this.lastWantedGifs];
  }

  searchGifs(query: string, offset = 0, limit = 10): void {


    if (!this.lastWantedGifs.includes(query)) {
      this.lastWantedGifs.unshift(query);
      this.lastWantedGifs = this.lastWantedGifs.splice(0, 10);
      localStorage.setItem('lastWantedGifs', JSON.stringify(this.lastWantedGifs));
    }

    localStorage.setItem('query', query);

    const httpParams = new HttpParams()
      .set('api_key', apiKey)
      .set('q', query)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    this.http.get<SearchGifsResponse>(`${this.apiUrl}/search`, { params: httpParams })
      .subscribe(res => {
        this.gifsResults = res;
      });
  }
}

import { Injectable } from '@angular/core';
import { apiKey } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../Model/Interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiUrlGifs = 'https://api.giphy.com/v1/gifs';
  private apiUrlStickers = 'https://api.giphy.com/v1/stickers';
  private limit = 10;
  private lastWantedGifs: string[] = [];
  public gifs: SearchGifsResponse;
  public trendingGifs: SearchGifsResponse = <SearchGifsResponse>{};
  public trendingStickers: SearchGifsResponse = <SearchGifsResponse>{};


  private httpParams = new HttpParams()
    .set('api_key', apiKey);

  constructor(private http: HttpClient) {
    this.lastWantedGifs = JSON.parse(localStorage.getItem('lastWantedGifs')!) || [];
    this.gifs = JSON.parse(localStorage.getItem('gifsResults')!) || [];
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

    let params = {
      ...this.createBasicParams(offset, limit),
      'q': query
    };

    this.http.get<SearchGifsResponse>(`${this.apiUrlGifs}/search`, { params: params })
      .subscribe(res => {
        this.gifs = res;
      });
  }

  searchTrending(offset = 0, limit = 10): void {
    this.http.get<SearchGifsResponse>(`${this.apiUrlGifs}/trending`, { params: this.createHttpParams(this.createBasicParams(offset, limit)) })
      .subscribe(res => {
        this.trendingGifs = res;
      });
  }

  searchStickers(offset = 0, limit = 10): void {
    this.http.get<SearchGifsResponse>(`${this.apiUrlStickers}/trending`, { params: this.createHttpParams(this.createBasicParams(offset, limit)) })
      .subscribe(res => {
        this.trendingStickers = res;
      });
  }

  private createBasicParams(offset: number, limit: number) {
    return {
      'api_key': apiKey,
      'limit': limit.toString(),
      'offset': offset.toString()
    }
  }
  private createHttpParams(data: any) {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return httpParams;
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifService {
  public GifList: Gif[] = [];

  /*
    creamos un arreglo de string vacio,
    contendra el historial de búsqueda
  */
  private _tagHistory: string[] = [];
  private apikey: string = 'llJtmDTrGF2yyNhrPhIJuw0ZbycKbP9H'; /* api de Giphy*/
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {}

  get tagHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string) {
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((olTag) => olTag !== tag);
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this.tagHistory.splice(0, 10);
    this.saveLocalStorage();
  }


  private saveLocalStorage(): void{
    localStorage.setItem('history', JSON.stringify(this._tagHistory))
  }

  private loadLocalStorage(): void{
    if(!localStorage.getItem('history')) return;

    this._tagHistory = JSON.parse(localStorage.getItem('history')!)

    if(this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory [0]);


  }




  searchTag(tag: string): void {
    if (tag.length === 0) return; //no permite al usuario dar enter a espacio vacio
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', tag);

    // usamos el servicio httpClient
    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.GifList = resp.data;
      });
  }
}

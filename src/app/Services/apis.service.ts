import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIsService {
  constructor(private httpClient: HttpClient) { }

  public showPlatinam = (url): Observable<any> => {
    return this.httpClient.get(url);
  }

  public showGold = (url): Observable<any> => {
    return this.httpClient.get(url);
  }

  public showSilver = (url): Observable<any> => {
    return this.httpClient.get(url);
  }

  public bookShow = (url, input): Observable<any> => {
    return this.httpClient.put(url, input);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/assets/Config/api';
import { UrlShortner } from '../Modals/urlShortner.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUrl(id: string) {
    return this.http.get(`${api.prod}/` + id);
  }

  shortUrl(data: UrlShortner) {
    return this.http.post(`${api.prod}/shortUrl`, data);
  }
}

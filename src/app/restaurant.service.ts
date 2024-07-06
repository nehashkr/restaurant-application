import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:3000/restaurants';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getRestaurant(id: string): Observable<any> { 
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addRestaurant(restaurant: any): Observable<any> {
    return this.http.post(this.apiUrl, restaurant);
  }

  updateRestaurant(id: string, restaurant: any): Observable<any> { 
    return this.http.put(`${this.apiUrl}/${id}`, restaurant);
  }

  deleteRestaurant(id: string): Observable<any> { 
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

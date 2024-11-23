import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getLeaderboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/leaderboard`);
  }

  startQuiz(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/start-quiz`, { username });
  }
}

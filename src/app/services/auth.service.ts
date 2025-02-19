import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      map(response => {
        localStorage.removeItem('token');
        localStorage.setItem('token', response.token);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

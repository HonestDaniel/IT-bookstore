import {Injectable} from "@angular/core";
import {User} from "../interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = '';

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<{token: string}> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const requestData = { ...user, ...currentUser };

    return this.http.post<{token: string}>('http://localhost:3000/login', requestData)
      .pipe(
        tap(
          ({token}: {token: string}) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
          }
        )
      )
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken('')
    localStorage.clear()
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/register', user);
  }
}

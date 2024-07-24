import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/Interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://webapi.da4.com.mx:8080/api/Account/GetToken';
  /*   private loginUrl = 'http://localhost:3000/api/login';
   */ private forgotPasswordUrl =
    'http://webapi.da4.com.mx:8080/api/Account/ForgotPassword';

  constructor(private http: HttpClient) {}
  getToken(userCredentials: {
    userEmail: string;
    userPassword: string;
  }): Observable<any> {
    const payload = {
      email: userCredentials.userEmail,
      password: userCredentials.userPassword,
    };
    return this.http.post(this.loginUrl, payload);
  }

  forgotPassword(email: string): Observable<any> {
    // If it's a GET request and you pass email as a query parameter
    return this.http.get(
      `${this.forgotPasswordUrl}?email=${encodeURIComponent(email)}`
    );

    // If it should be a POST request, you would send it like this:
    // const payload = { email: email };
    // return this.http.post(this.forgotPasswordUrl, payload);
  }

  confirmForgotPassword(details: {
    email: string;
    token: string;
    newPassword: string;
    confirmNewPassword: string;
  }): Observable<any> {
    const confirmForgotPasswordUrl =
      'http://doc.da4.com.mx/api/Account/ConfirmForgotPassword';
    return this.http.post(confirmForgotPasswordUrl, details);
  }

  getUsers(): Observable<User[]> {
    // URL del endpoint que devuelve los usuarios
    const usersUrl = 'https://dummyjson.com/auth/login';
    return this.http.get<User[]>(usersUrl);
  }
}

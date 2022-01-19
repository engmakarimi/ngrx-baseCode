import { environment } from './../../../environments/environment';
import { RegisterResponseInterface } from './../types/registerResponse.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types';
import { RegisterRequestInterface } from '../types';
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  apiUrl:string=environment.apiUrl;

user:CurrentUserInterface={
   id:1,
  email:'string',
  createAt:'string',
  updateAt:'string',
  username:"'string'",
  bio:'string',
  image:'string',
  token:'string',}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.httpClient
      .post<RegisterResponseInterface>(this.apiUrl+'/users', data)
      .pipe(map((response) =>  this.getUser(response))
      );
  }


  login(data: LoginRequestInterface):Observable<CurrentUserInterface>{
    return this.httpClient
    .post<RegisterResponseInterface>(this.apiUrl+'/users/login', data)
    .pipe(map((response) => this.getUser(response)));
}

getUserProfile():Observable<CurrentUserInterface>{
  return this.httpClient
  .get<RegisterResponseInterface>(this.apiUrl+'/user')
  .pipe(map((response) => this.getUser(response)));
}

private getUser(response:RegisterResponseInterface){
   return response.user;
}
}

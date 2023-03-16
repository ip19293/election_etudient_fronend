import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

import { map, tap } from 'rxjs/operators';
import { SignupRequestPayload } from '../signup/signup_request_payload';
import { LoginResponse } from '../login/login_response_payload';
import { LoginRequestPayload } from '../login/login_request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() nom: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    nom: this.getnom(),
  };

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  getSyndicats() {
    let token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWxlbUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg4Njk3MDksImV4cCI6MTY3ODg3MTE0OX0.v5eug5D5CjsMLzCiz1p5V8-VAxU3M2zcJDeLorpsFL8"
    let head_obj=new HttpHeaders().set("Authorization","Bearer " +token)
    this.httpClient.get("http://localhost:8080/election/syndicat/all")
  }
  getEtudients() {
    
    return this.httpClient.get("http://localhost:8080/election/admin/etudient/all");
}
 

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken() {
    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:8080/api/auth/refresh/token',
        this.refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          this.localStorage.clear('authenticationToken');
          this.localStorage.clear('expiresAt');

          this.localStorage.store(
            'authenticationToken',
            response.authenticationToken
          );
          this.localStorage.store('expiresAt', response.expiresAt);
        })
      );
  }

  logout() {
    this.httpClient
      .post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload, {
        responseType: 'text',
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          throwError(error);
        }
      );
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('nom');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  getnom() {
    return this.localStorage.retrieve('nom');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}

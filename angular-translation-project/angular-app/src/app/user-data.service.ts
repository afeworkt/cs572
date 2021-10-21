import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private apiBaseUrl: string = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  public addUser(user: User): Promise<User> {
    const url: string = this.apiBaseUrl + "/users/register"; 
    return this.http.post(url,user).toPromise()
      .then(response => response as User).catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.log("Something went wrong ", error);
    return Promise.reject(error.message || error);
  }
}

export class User { 
  _id!: string;
  username!: string;
  name!: number; 
  password!: number;
  }
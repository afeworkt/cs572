import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Game } from './games-list/games-list.component';
@Injectable({
  providedIn: 'root'
})

export class GamesDataService {
  private apiBaseUrl: string = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  public getGames(offset:number,limit:number): Promise<Game[]> {
    const url: string = `${this.apiBaseUrl}/games?offset=${offset}&count=${limit}`;
     return this.http.get(url).toPromise().then(response => response as Game[]).catch(this.handleError);
  }
  public getGame(gameId: string): Promise<Game> {
    const url: string = this.apiBaseUrl + "/games/" + gameId; 
    return this.http.get(url).toPromise()
      .then(response => response as Game).catch(this.handleError);
  }
  public deleteGame(gameId: string): Promise<Game> {
    const url: string = this.apiBaseUrl + "/games/" + gameId; 
    return this.http.delete(url).toPromise()
      .then(response => response as Game).catch(this.handleError);
  }
  public addOneGame(game: Game): Promise<Game> {
    const url: string = this.apiBaseUrl + "/games/"; 
    return this.http.post(url,game).toPromise()
      .then(response => response as Game).catch(this.handleError);
  }
  public updateOneGame(gameId: string,game:Game): Promise<Game> {
    const url: string = this.apiBaseUrl + "/games/" + gameId; 
    return this.http.put(url,game).toPromise()
      .then(response => response as Game).catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.log("Something went wrong ", error);
    return Promise.reject(error.message || error);
  }
}

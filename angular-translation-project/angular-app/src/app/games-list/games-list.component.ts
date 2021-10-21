import { Component, OnInit } from '@angular/core';

import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  games: Game[]= [];
  offset:number=0;
  limit:number=5;
  message:string='';
  constructor(private gamesDataService:GamesDataService) { 
    
  }

  ngOnInit(): void {
      this.getAllGames(this.offset,5);
  }
  private getAllGames(offs:number,lim:number) {
    this.offset=offs;
    this.limit=lim;
    this.gamesDataService.getGames(this.offset, lim).then((response) => {
      this.games = response;
      if (response.length == 0 && this.offset > 0) {
        this.offset -= 5;
      }
    });
  }

  deleteGame(gameId:string): void {
      this.gamesDataService.deleteGame(gameId).then((response)=>{
        this.message='successfully deleted game';
      this.getAllGames(this.offset,this.limit);
    }).catch(error=>this.message=error);
  }
  next(): void {
      this.offset+=5;
      this.getAllGames(this.offset,this.limit);
  }
  previous(): void {
    if(this.offset>0){
      this.offset-=5;
      this.getAllGames(this.offset,this.limit);
    }
  }

}

export class Game { 
  _id!: string;
  title!: string;
  price!: number; 
  year!: number;
  minPlayers!: number;
  maxPlayers!: number;
  minAge!: number;
  rate!: number;
  designers!: string;
  publisher!:any;
  }
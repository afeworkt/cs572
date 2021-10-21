import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { GamesDataService } from '../games-data.service';
import { Game } from '../games-list/games-list.component';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  game: Game | undefined;
  gameId:string;
  rate:number=0;
  constructor(private gamesDataService:GamesDataService,
    public route: ActivatedRoute, private router: Router ) { 
      this.gameId = this.route.snapshot.params['gameId'];
  }

  ngOnInit(): void {
      this.gamesDataService.getGame(this.gameId).then((response)=>{this.game=response as Game;this.rate=this.game.rate?this.game.rate:0;})
  }

  goBack(): void {
    this.router.navigate(['/games']);
  }

}

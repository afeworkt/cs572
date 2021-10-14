import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private gamesDataService:GamesDataService,
    public route: ActivatedRoute, private location: Location ) { 
      // const gameId = Number(this.route.snapshot.paramMap.get('id'));

      this.gameId = this.route.snapshot.params['gameId'];
  }

  ngOnInit(): void {
      this.gamesDataService.getGame(this.gameId).then(response=>this.game=response as Game)
  }

  goBack(): void {
    this.location.back();
  }

}

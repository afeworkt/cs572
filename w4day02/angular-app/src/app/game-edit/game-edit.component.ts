import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Game } from '../games-list/games-list.component';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  game!: Game;
  gameId: string;
  gameForm!: FormGroup;
  submitted: boolean = false;
  editing: boolean = false;
  message: any = {content:'',success:false};
  constructor(private gamesDataService: GamesDataService,
    public route: ActivatedRoute, private _formBuilder: FormBuilder) {
    this.gameId = this.route.snapshot.params['gameId'];
  }

  ngOnInit(): void {
    this.gameForm = this._formBuilder.group({
      title: ['', Validators.required],
      year: ['', Validators.required],
      price: ['', Validators.required],
      rate: ['', Validators.required],
      minAge: ['', Validators.required],
      minPlayers: ['', Validators.required],
      maxPlayers: ['', Validators.required],
      designers: ['', Validators.required],
    });
    if (this.gameId && this.gameId!=='add') {
      this.editing = true;
      this.gamesDataService.getGame(this.gameId).then(
        (response) => {
          this.game = response as Game;
          this.gameForm.patchValue(this.game);
        });
    }
  }
  get f() { return this.gameForm.controls; }
  saveGame(): void {
    this.submitted = true;
    if (this.gameForm.invalid) {
      this.message.content = 'please fill all inputs';
      this.message.success=false;
      return;
    }
    let g = new Game();
    g.title = this.gameForm.value.title;
    g.year = this.gameForm.value.year;
    g.price = this.gameForm.value.price;
    g.rate = this.gameForm.value.rate;
    g.minAge = this.gameForm.value.minAge;
    g.minPlayers = this.gameForm.value.minPlayers;
    g.maxPlayers = this.gameForm.value.maxPlayers;
    g.designers = this.gameForm.value.designers;
    if (this.editing) {
      this.gamesDataService.updateOneGame(this.gameId, g).then((result) => {
   
      this.message.content = 'Game successfully updated!';
      this.message.success=true;
      }).catch((error) => {
      this.message.content = 'Unable to update game';
      this.message.success=false;
      });
    } else {
      this.gamesDataService.addOneGame(g).then((result) => {

      this.message.content = 'New game successfully created!';
      this.message.success=true;
        
      }).catch((error) => {
      this.message.content = 'Unable to create new game!';
      this.message.success=false;
      });
    }
    // this.userDataService.addUser(u).then((response)=>this.message='successfully registered').catch((error)=>this.message='Unable to create account!');
  }
}

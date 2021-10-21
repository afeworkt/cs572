import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-rating',
  templateUrl: './game-rating.component.html',
  styleUrls: ['./game-rating.component.css']
})
export class GameRatingComponent implements OnInit {
  @Input() numstars = 0;
  stars:Number[]=[];
  constructor() { 
    
  }

  ngOnInit(): void {
    console.log(this.numstars);
    for (let i = 0; i < this.numstars; i++) {
      this.stars.push(i);
    }
  }

}

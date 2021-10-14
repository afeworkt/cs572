import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ErrorPageComponent,
    GamesListComponent,
    GameDetailComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([{
      path: "",
      component: WelcomeComponent
    },
    {
      path: "games",
      component: GamesListComponent
    },
    {
      path: "games/:gameId",
      component: GameDetailComponent
    },
    {
      path: "**",
      component: ErrorPageComponent
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

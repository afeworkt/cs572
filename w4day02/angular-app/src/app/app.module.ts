import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GameRatingComponent } from './game-rating/game-rating.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ErrorPageComponent,
    GamesListComponent,
    GameDetailComponent,
    NavigationComponent,
    FooterComponent,
    UserSignupComponent,
    GameEditComponent,
    GameRatingComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{
      path: "",
      component: WelcomeComponent
    },
    {
      path: "games",
      component: GamesListComponent
    },
    {
      path: "game/:gameId",
      component: GameDetailComponent
    },
    {
      path: "game/add",
      component: GameEditComponent
    },
    {
      path: "games/:gameId",
      component: GameEditComponent
    },
    {
      path: "register",
      component: UserSignupComponent
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

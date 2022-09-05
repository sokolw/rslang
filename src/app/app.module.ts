import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import SharedModule from './shared/shared.module';
import TextBookModule from './text-book/text-book.module';
import { httpInterceptorProviders } from './core/auth/auth-interceptor';
import MainPageModule from './main-page/main-page.module';
import GameAudioCallModule from './game-audio-call/game-audio-call.module';
import StatisticPageModule from './statistic-page/statistic-page.module';
import GameSprintModule from './game-sprint/game-sprint.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MainPageModule,
    GameAudioCallModule,
    StatisticPageModule,
    TextBookModule,
    GameSprintModule,
  ],
  bootstrap: [AppComponent],
  providers: [httpInterceptorProviders],
})
export default class AppModule {}

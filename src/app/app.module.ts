import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import SharedModule from './shared/shared.module';
import { httpInterceptorProviders } from './core/auth/auth-interceptor';
import MainPageModule from './main-page/main-page.module';
import SprintGameComponent from './sprint-game/sprint-game.component';

@NgModule({
  declarations: [AppComponent, SprintGameComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MainPageModule,
  ],
  bootstrap: [AppComponent],
  providers: [httpInterceptorProviders],
})
export default class AppModule {}

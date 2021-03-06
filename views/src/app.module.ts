import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AuthGuard } from './common/auth.guard';
import { Home } from './home';
import { Login } from './login';
import { About } from './about';
import { Howto } from './howto';
import { Editimg } from './editimg';
import { Secure } from './secure';
import { Credits } from './credits';
import { Signup } from './signup';
import { Search } from './search';
import { Choices } from './choices';
import { Hearts } from './hearts';
import { Toasts } from './toasts';
import { App } from './app';

import { routes } from './app.routes';

@NgModule({
  bootstrap: [App],
  declarations: [
    Home, Login, Signup, App, About, Search,
    Choices, Toasts, Hearts, Credits, Howto,
    Editimg, Secure
  ],
  imports: [
    HttpModule, BrowserModule, FormsModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [
    AuthGuard, ...AUTH_PROVIDERS
  ]
})
export class AppModule {}

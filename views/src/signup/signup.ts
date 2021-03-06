import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Config } from '../config';
import { Crypto } from '../common/crypto';
import { Toasts, ToastService } from '../toasts';

const styles   = require('./signup.css');
const template = require('./signup.html');

@Component({
  selector: 'signup',
  template: template,
  styles: [ styles ]
})
export class Signup {
  message: string = '';
  crypto: Crypto;

  constructor(public router: Router,
              public t: ToastService,
              public http: Http) {
  }

  signup(event, roll, password, password2, authCode) {
    event.preventDefault();
    if (password !== password2) {
      this.t.toast('The 2 typed passwords do not match');
      return;
    }

    let beginData = Crypto.fromJson({
      choices: []
    });

    this.crypto = new Crypto(password);

    let passHash = Crypto.hash(password);

    this.crypto.newKey();

    // Store encrypted private key, public key, and encrypted empty data
    let body = JSON.stringify({
      roll,
      passHash,
      authCode,
      privKey: this.crypto.encryptSym(this.crypto.serializePriv()),
      pubKey: this.crypto.serializePub(),
      data: this.crypto.encryptSym(beginData)
    });

    this.http.post(Config.loginFirstUrl, body, { headers: contentHeaders })
      .subscribe(
        response => {
          this.router.navigate(['login']);
        },
        error => {
          this.message = 'Wrong authentication code!';
          console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

  mailer(event, roll) {
    event.preventDefault();
    this.http.get(Config.loginMailUrl + roll)
      .subscribe(
        response => {
          this.message =
            'Mail sent to your @iitk ID ! ' +
            'Please check your mail for the authentication token, ' +
            'and use it in the signup form below.';
          this.t.toast(this.message);
        },
        error => {
          if (error.status === 404) {
            this.message =
              'Your information was not found in our database. ' +
              'Please send us a mail at pclubiitk@gmail.com';
          } else if (error.status === 400) {
            this.message = 'You have already registered';
          } else {
            this.message = 'There was an error. Let us know at pclubiitk@gmail';
          }
          this.t.toast(this.message);
        }
      );
  }

}

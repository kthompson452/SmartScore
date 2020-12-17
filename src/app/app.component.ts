import { Component } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  userId: string;
  constructor(public auth: AngularFireAuth, private router: Router) {
    this.userId="no-user";
    this.auth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
    
  }

  logout() {
    this.auth.signOut().then(() => this.router.navigate(['login']));
  }

  test(){
    console.log(this.userId)
  }

}

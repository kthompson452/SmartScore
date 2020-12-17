import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  
  userId: string;

  betsDB: AngularFireList<Bet[]>;
  bets: Bet[];

  constructor(public db: AngularFireDatabase, public auth: AngularFireAuth) { 
    this.userId = "ERROR";
    this.bets = [];
    this.auth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    });
    this.betsDB = this.db.list(`bets/${this.userId}`);
  }

  getBets(){
    setTimeout(() => this.db.list(`bets/${this.userId}`), 10);
    this.betsDB = this.db.list(`bets/${this.userId}`);
    this.betsDB.snapshotChanges().forEach(betsSnapshot => {
      this.bets = []
      var i = 0
      betsSnapshot.forEach(betsSnapshot => {
        let bet = betsSnapshot.payload.toJSON();
        let key = betsSnapshot.key;
        this.bets.push(bet as Bet);
        if(key) this.bets[i].key = key;
        i = i+1;
      })
    })
  return this.bets
  }
}

export class Bet{
  key: string;
  teams: string[];
  points: string[]; 
  constructor(){
    this.key = '';
    this.teams = [];
    this.points = [];
  }
}
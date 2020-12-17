import { Component, OnInit } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {

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

  ngOnInit(): void {
    this.betsDB = this.db.list(`bets/${this.userId}`);
    setTimeout(() => this.getBets(), 10)
  }

  getBets(){
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
  }

  printBets(){
    console.log(this.bets[1])
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
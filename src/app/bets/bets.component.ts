import { Component, OnInit } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ScoresComponent } from '../scores/scores.component';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {

  userId: string;

  betsDB: AngularFireList<Bet[]>;
  bets: Bet[];

  constructor(public db: AngularFireDatabase, public auth: AngularFireAuth, public scores: ScoresComponent) { 
    this.userId = "ERROR";
    this.bets = [];
    this.betsDB = this.db.list(`bets/${this.userId}`);
    this.auth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    });
    this.scores.getScores();
  }

  ngOnInit(): void {
    setTimeout(() => this.getBets(), 100)
  }

  getColor(bet: Bet){
    return bet.isWinning ? "green" : "red";
  }

  checkBets(){
    for(var i = 0; i < this.bets.length; i++){
      var isGame = false;
      var j = 0;
      while(!isGame){
        if(this.scores.games[j].awayTeam == this.bets[i].awayTeam){
          isGame = true;
        }
        else{
          j++;
        }
      }
      //j is now the index of the game that the bet occurs in
      if(this.bets[i].teamBet == this.bets[i].homeTeam){
        //team bet on is the home team
        var ptsWithSpread = this.scores.games[j].homeScore + this.bets[i].points;
        if(ptsWithSpread > this.scores.games[j].awayScore){
          this.bets[i].isWinning = true;
        }else{
          this.bets[i].isWinning = false;
        }
      }
      else if(this.bets[i].teamBet == this.bets[i].awayTeam){
        //team bet on is the away team
        var ptsWithSpread = this.scores.games[j].awayScore + this.bets[i].points;
        if(ptsWithSpread > this.scores.games[j].homeScore){
          this.bets[i].isWinning = true;
        }else{
          this.bets[i].isWinning = false;
        }
      }
    }
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

}

export class Bet{
  key: string;
  homeTeam: string;
  awayTeam: string;
  teamBet: string;
  points: number;
  isWinning: boolean;
  constructor(){
    this.key = '';
    this.homeTeam = '';
    this.awayTeam = ''
    this.points = 0;
    this.teamBet = '';
    this.isWinning = false;
  }
}
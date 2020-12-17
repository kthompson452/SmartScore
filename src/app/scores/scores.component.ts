import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

  displayedColumns: string[] = ['awayTeam', 'awayScore', 'homeTeam', 'homeScore']

  weeksDB: AngularFireList<Week[]>;
  games: Game[];
  currWeek: Week;
  constructor(public db: AngularFireDatabase, public auth: AngularFireAuth) {
    this.weeksDB = this.db.list(`schedule`);
    this.games = [];
    this.currWeek = new Week;
   }

  ngOnInit(): void {
    setTimeout(() => this.getScores(), 1000)
  }

  getWeekNum(){
    var date = formatDate(new Date(), 'yyyy-MM-dd', 'en').toString();
    var week14Start = "2020-12-10";
    var week15Start = "2020-12-17";
    var week16Start = "2020-12-24";
    var week17Start = "2020-12-31";
    var week18Start = "2021-01-07";
    if (date < week14Start){
        return("week13")
    }
    else if (date < week15Start){
        return("week14")
    }
    else if (date < week16Start){
      return("week15")
    }
    else if (date < week17Start){
      return("week16")
    }
    else if (date < week18Start){
      return("week17")
    }
    else{
      return("")
    }
  }
  getScores(){
    this.weeksDB = this.db.list(`schedule/${this.getWeekNum()}`);
    this.weeksDB.snapshotChanges().forEach(gamesSnapshot => {
      this.games = []
      gamesSnapshot.forEach(gamesSnapshot => {
        let game = gamesSnapshot.payload.toJSON();
        console.log(game)
        this.games.push(game as Game);
      })
    })
  }

}

export class Week{
  games: Game[];
  constructor(){
    this.games = [];
  }
}

export interface Game{
  awayScore: number;
  homeScore: number;
  awayTeam: string;
  homeTeam: string;
}
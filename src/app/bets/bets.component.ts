import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { BetsService, Bet } from 'src/app/bets.service';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {

  bets: Bet[];
  displayBets = false;
  
  constructor(private bs: BetsService) { 
    this.bets = [];
  }

  ngOnInit(): void {
    this.bets = this.bs.getBets();
    setTimeout(() => this.bets = this.bs.getBets(), 5000)
    console.log("sdf")
  }

  test(){
    this.displayBets = true;
  }


}

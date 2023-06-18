import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {


  constructor(private router: Router, private firestore: Firestore, private gameService: GameService) { }


  ngOnInit(): void { }


  newGame() {
    let game = new Game();
    const gameRef = collection(this.firestore, 'games');
    addDoc(gameRef, this.gameService.toJson())
      .then((gameInfo: any) => {
        this.router.navigate(['/game', gameInfo.id]);
        this.gameService.game.id = gameInfo.id;
        console.log('Game ID: ', this.gameService.game.id);
      });
  }
}


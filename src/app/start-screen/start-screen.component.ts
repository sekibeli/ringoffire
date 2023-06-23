import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
game: Game;

  constructor(private router: Router, private firestore: Firestore) { }


  ngOnInit(): void { }

  newGame() {
    // let game = new Game;
    this.game = new Game;
    const gameRef = collection(this.firestore, 'games'); // Eine Verbindung zur Datenbank wird hergestellt und zeigt auf die Collection "games"
    addDoc(gameRef, this.game.toJson()) // Ein neues Document wird erstellt/hinzugefügt
      .then((gameInfo: any) => { // Bei erfolgreicher Erstellung ...
        this.router.navigate(['/game', gameInfo.id]); // ... wird weitergeleitet auf das entsprechende Document
        this.game.id = gameInfo.id;
        // console.log(gameInfo);
        // console.log('Game ID: ', this.game.id);
      });
  }
}


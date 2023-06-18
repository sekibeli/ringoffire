import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { addDoc, doc, getFirestore, onSnapshot, provideFirestore, updateDoc } from '@angular/fire/firestore';
// import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { query, getDocs, DocumentData, Query } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { IGame } from '../models/game.model';
import { Observable, of } from 'rxjs';
import { update } from '@angular/fire/database';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string;
  game !: Game;
  games$: Observable<any>;
  gameId: string;



  constructor(private firestore: Firestore,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private gameService: GameService) {
  }

  ngOnInit(): void {

    this.newGame();
    // const coll = collection(this.firestore, 'games');
    // this.games$ = collectionData(coll, { idField: 'id' });
    // this.games$.subscribe((game) => {
    //   console.log('1Game update: ', game);
    // })




    const gamesCollection = collection(this.firestore, 'games');
    this.route.params.subscribe((params) => {
      console.log('params: ', params['id']);
      this.gameId = params['id'];
      const gameRef = doc(this.firestore, 'games', params['id']);

      const startListening = onSnapshot(gameRef, (snappi: any) => {
        const game = snappi.data();
        console.log('Game update:', game);

        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        console.log('Players:', game.players);
      });


    })

  }

  // const gamesCollection = collection(this.firestore, 'games');
  // const gamesQuery = query(gamesCollection);
  // onSnapshot(gamesQuery, (snapshot) => {
  //   snapshot.forEach((game) => {
  //     console.log('Game update', game.data());
  //   });
  // }, (error) => {
  //   console.error('Fehler beim Abonnieren der Spiele:', error);
  // });




  newGame() {
    this.game = new Game();
    // console.log(this.game);

    // const coll = collection(this.firestore, 'games')
    // addDoc(coll, this.game.toJson());
  }


  takeCard() {

    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();

      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    this.gameService.getGame();
    console.log(this.game, 'ID: ', this.gameId);
    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
        // console.log('GameComp/Player: ', this.game.players);
        // console.log('GameComp: ',this.game);
        
      }
    });
  }

  saveGame() {
    // const gamesCollection = collection(this.firestore, 'games');
    const gameColl = doc(this.firestore, 'games', this.gameId);
    updateDoc(gameColl, this.game.toJson());
    // const gameColl = doc(this.firestore, 'games', this.gameId);
   
    }
   
  }



// function valueChanges(gamesQuery: Query<DocumentData>) {
//   throw new Error('Function not implemented.');
// }


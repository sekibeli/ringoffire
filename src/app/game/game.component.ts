import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { addDoc, getFirestore, onSnapshot, provideFirestore } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { query, getDocs, DocumentData, Query } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string;
  game !: Game;
  
  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

  }

  ngOnInit(): void {

    this.newGame();
    this.route.params.subscribe((params)=> {
      console.log(params['id']);
        const gamesCollection = collection(this.firestore, 'games');
    const gamesQuery = query(gamesCollection);
    onSnapshot(gamesQuery, (snapshot) => {
      snapshot.forEach((game) => {
        console.log('Game update', game.data());
      });
    }, (error) => {
      console.error('Fehler beim Abonnieren der Spiele:', error);
    });
    })
  
  }

  newGame() {
    this.game = new Game();
    // console.log(this.game);
    // const coll = collection(this.firestore, 'games')
    // addDoc(coll , this.game.toJson());
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

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

}
function valueChanges(gamesQuery: Query<DocumentData>) {
  throw new Error('Function not implemented.');
}


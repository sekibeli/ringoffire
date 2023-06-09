import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { addDoc, doc, getFirestore, onSnapshot, provideFirestore, updateDoc } from '@angular/fire/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';





@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameover = false;
  game: Game;
  gameId: string;



  constructor(private firestore: Firestore,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {
    // console.log('constructor game components');
  }

  ngOnInit(): void {
    this.newGame();

    // const gamesCollection = collection(this.firestore, 'games');
    this.route.params.subscribe((params) => {
      // console.log('ngOnInit Game components params: ', params['id']);
      this.gameId = params['id'];
      const gameRef = doc(this.firestore, 'games', params['id']);

      // const startListening = 
      onSnapshot(gameRef, (snappi: any) => {
        const game = snappi.data();
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.playerImages = game.playerImages;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;

      });
    })

  }

  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameover = true;
    }
    else if (this.game.players.length < 2) {
      this.openDialog();
    }

    else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    // console.log(this.game);
    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.playerImages.push('male.png');
        this.saveGame();
      }
    });
  }

  saveGame() {
    const gameColl = doc(this.firestore, 'games', this.gameId);
    updateDoc(gameColl, this.game.toJson());
  }

  editPlayer(playerId: number) {
    // console.log('edit Player', playerId);

    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1)
          this.game.playerImages.splice(playerId, 1)
        }
        else {
          // console.log('changes received', change);
          this.game.playerImages[playerId] = change;
        }

        this.saveGame();
      }

    });
  }

  showStartScreen(){
    this.gameover = false;
    this.router.navigate(['']);
  }
 
}




import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, updateDoc, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { IGame } from '../models/game.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public game: IGame = {
    players: [],
    stack: [],
    playedCards: [],
    currentPlayer: 0
  }
  constructor(public firestore: Firestore) {

    for (let i = 1; i < 14; i++) {
      this.game.stack.push('ace_' + i);
      this.game.stack.push('clubs_' + i);
      this.game.stack.push('diamonds_' + i);
      this.game.stack.push('hearts_' + i);

    }
    this.shuffle(this.game.stack);
  }

  public toJson() {
    return {
      players: this.game.players,
      stack: this.game.stack,
      playedCards: this.game.playedCards,
      currentPlayer: this.game.currentPlayer
    }

  }

  shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  // addGame(game: IGame) {
  //   const gamesRef = collection(this.firestore, 'games');
  //   game = this.toJson();
  //   return addDoc(gamesRef, game)
  // }

  getGame(): Observable<IGame[]> {
    const gameRef = collection(this.firestore, 'games');
    return collectionData(gameRef, { idField: 'id' }) as Observable<IGame[]>;
  }

  updateGame() {
    const gameColl = doc(this.firestore, 'games', this.game.id);
    const dataGame = {
      currentPlayer: this.game.currentPlayer,
      playedCards: this.game.playedCards,
      players: this.game.players,
      stack: this.game.stack
    }
    return setDoc(gameColl, dataGame)
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

allProfilePictures = ['female.png','male.png','katze.png','miz1.png','pinguin.png','affe.png','kaefer.png','pelikan.png']
  constructor(public dialogRef: MatDialogRef<EditPlayerComponent> ){}

  ngOnInit(): void {
    
  }

  selectPicture(picture){}

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

allProfilePictures = ['female.png','male.png']
  constructor(){}

  ngOnInit(): void {
    
  }

}

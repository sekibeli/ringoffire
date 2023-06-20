import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent implements OnInit{
  @Input() name;
  @Input() playerActive: boolean = false;


  constructor(){}

  ngOnInit(){}
}

// <a target="_blank" href="https://icons8.com/icon/23458/eingekreist-benutzer-m%C3%A4nnlich-hauttyp-5">Eingekreist Benutzer Männlich Hauttyp 5</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
// <a target="_blank" href="https://icons8.com/icon/23452/eingekreist-benutzer-weiblich-hauttyp-4">Eingekreist Benutzer Weiblich Hauttyp 4</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
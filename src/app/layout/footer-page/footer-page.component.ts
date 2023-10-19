import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-page',
  templateUrl: './footer-page.component.html',
  styleUrls: ['./footer-page.component.scss']
})

export class FooterPageComponent {
  year: Number;
  copyright: String;
  version: String;

  constructor() {
    this.year = new Date().getFullYear();
    this.copyright = `Copyright © Grupo Advisers ${this.year}`;
    this.version = 'v1.0';
  }
}

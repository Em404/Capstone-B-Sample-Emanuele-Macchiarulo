import { Component } from '@angular/core';
import { ISampleDetail } from '../../models/i-sample';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrl: './preferiti.component.scss'
})
export class PreferitiComponent {

  preferiti: ISampleDetail[] = []

  constructor() {}

  ngOnInit() {
    this.getFavourites()
  }

  getFavourites() {
    this.preferiti = JSON.parse(localStorage.getItem('preferiti') || '')
  }

  isEmpty() {
    this.preferiti = JSON.parse(localStorage.getItem('preferiti') || '')
    return this.preferiti.length === 0;
  }

}

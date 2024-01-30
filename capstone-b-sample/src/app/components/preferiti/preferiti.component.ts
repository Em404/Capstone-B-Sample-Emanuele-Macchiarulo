import { Component } from '@angular/core';
import { ISampleDetail } from '../../models/i-sample';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrl: './preferiti.component.scss',
})
export class PreferitiComponent {
  preferiti: ISampleDetail[] = [];

  constructor() {}

  ngOnInit() {
    this.preferiti = JSON.parse(localStorage.getItem('preferiti') || '');
  }

  isEmpty() {
    return this.preferiti.length === 0;
  }
}

import { Component } from '@angular/core';
import { ISampleDetail } from '../../models/i-sample';
import { SampleDetailService } from '../../services/sample-detail.service';
import { FavouriteService } from '../../services/favourite.service';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrl: './preferiti.component.scss',
})
export class PreferitiComponent {
  preferiti: ISampleDetail[] = [];

  constructor(private favouriteSvc: FavouriteService) {}

  // ngOnInit() {
  //   this.favouriteSvc.preferiti$.subscribe((preferiti) => {
  //     this.preferiti = preferiti;
  //   });
  // }

  ngOnInit() {
    if (this.favouriteSvc.preferiti$) {
      this.favouriteSvc.preferiti$.subscribe((preferiti) => {
        console.log('preferiti:', preferiti);
        this.preferiti = preferiti;
      });
    } else {
      console.error('preferiti$ non definito.');
    }
  }

  isEmpty() {
    return this.preferiti.length === 0;
  }
}

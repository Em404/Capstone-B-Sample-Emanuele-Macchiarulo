import { Component, Input } from '@angular/core';
import { SampleDetailService } from '../../services/sample-detail.service';
import { ISampleDetail } from '../../models/i-sample';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrl: './preferiti.component.scss'
})
export class PreferitiComponent {

  preferiti: ISampleDetail[] = []

  constructor(private sampleDetailSvc: SampleDetailService) {}

  ngOnInit() {
    this.getFavourites()
  }

  getFavourites() {
    this.preferiti = JSON.parse(localStorage.getItem('preferiti') || '')
  }

}

import { Component } from '@angular/core';
import { SampleService } from '../../services/sample.service';
import { ISample, ISampleDetail } from '../../models/i-sample';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private sampleSvc: SampleService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.sampleSvc.getSamples();
    }, 2000);

  }

  public get list(): ISampleDetail [] {
    return this.sampleSvc.sampleList;
  }

  toggle(id: number) {
    // const elemento = this.sampleSvc.sampleList.find((el) => el = id)
  }

  searchSample(){

  }

}

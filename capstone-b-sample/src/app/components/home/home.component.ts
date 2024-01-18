import { Component } from '@angular/core';
import { SampleService } from '../../services/sample.service';
import { ISample, ISampleDetail, ISampleObj } from '../../models/i-sample';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  sampleForm: UntypedFormGroup;

  constructor(private sampleSvc: SampleService) {
    this.sampleForm = new UntypedFormGroup({
      search: new UntypedFormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.sampleSvc.getSamples();
  }

  public get list(): ISampleDetail[] {
    return this.sampleSvc.sampleList;
  }

  searchSample(event: Event) {
    const search = (event.target as HTMLInputElement).value
    console.log('sto cercando', search);
    if(search === '') {
      this.sampleSvc.getSamples();
    } else {
      this.sampleSvc.searchSamples(search)
    }
  }

}

import { Component } from '@angular/core';
import { SampleService } from '../../services/sample.service';
import { ISample, ISampleDetail, ISampleObj } from '../../models/i-sample';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { count } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  sampleForm: UntypedFormGroup;

  public page: number = 1
  public pageSize: number = 15
  public items: number = 0

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

  public get listObj(): ISampleObj {
    return this.sampleSvc.sampleObj;
  }

  public get pages(): number {
    this.items = Math.ceil(this.sampleSvc.sampleObj.count! / this.pageSize)
    return this.items
  }

  public get loading(): boolean {
    return this.sampleSvc.loading
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

  goToPreviousPage() {
    this.sampleSvc.toPreviousPage()
  }

  goToNextPage() {
    this.sampleSvc.toNextPage()
  }

  changePage(newPage: number) {
    if(newPage > this.page) {
      console.log('sono in if');
      console.log(newPage);
      console.log(this.page);
      this.sampleSvc.toNextPage()
    } else {
      console.log('sono in else');
      console.log(newPage);
      console.log(this.page);
      this.sampleSvc.toPreviousPage()
    }
  }

}

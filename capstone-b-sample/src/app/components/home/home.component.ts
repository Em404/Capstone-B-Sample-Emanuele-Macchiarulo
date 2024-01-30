import { ChangeDetectorRef, Component } from '@angular/core';
import { SampleService } from '../../services/sample.service';
import { ISampleDetail, ISampleObj } from '../../models/i-sample';
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

  public page: number = 1
  public pageSize: number = 15
  public items: number = 0
  public oldPage: number = 1

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

  setOldPage(page: number) {
    this.oldPage = page
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
    if((newPage - this.oldPage) === 1){
      this.sampleSvc.toNextPage()
      this.setOldPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if((this.oldPage - newPage) === 1) {
      this.sampleSvc.toPreviousPage()
      this.setOldPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.sampleSvc.toPage(newPage)
      this.setOldPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

}

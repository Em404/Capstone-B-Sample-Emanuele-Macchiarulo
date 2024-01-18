import { LoginService } from './login.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { ISample, ISampleDetail, ISampleObj } from '../models/i-sample';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SampleService {
  sampleList: ISampleDetail[] = [];
  sampleListSubject: BehaviorSubject<ISample[]> = new BehaviorSubject<
    ISample[]
  >([]);
  sampleObj!: ISampleObj;

  nextPage: string =''
  previousPage: string =''

  constructor(private apiSvc: ApiService, private loginSvc: LoginService) {}

  getSamples() {
    this.apiSvc
      .get('https://freesound.org/apiv2/search/text/?query=', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res: ISampleObj) => {
        this.sampleList = res.results;
        // console.log(res);
        // console.log(this.sampleList);

      });
  }

  searchSamples(param: string) {
    this.apiSvc
      .get('https://freesound.org/apiv2/search/text/?query=' + param, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res: ISampleObj) => {
        this.sampleList = res.results;
        console.log(res);
        console.log(this.sampleList);
      });
  }

}

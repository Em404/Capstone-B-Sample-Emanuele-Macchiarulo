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

  loading: boolean = false

  constructor(private apiSvc: ApiService, private loginSvc: LoginService) {}

  getSamples() {
    this.loading = true
    this.apiSvc
      .get('https://freesound.org/apiv2/search/text/?query=', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res: ISampleObj) => {
        this.loading = false
        this.sampleList = res.results;
        console.log('res getsamples ', res);
        this.getPage(res);
        this.sampleObj = res;
        console.log(this.sampleObj.count);
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
        this.getPage(res);
        this.sampleObj = res;
        console.log(this.sampleObj);
        console.log('La res della ricerca', res);
        console.log(this.sampleList);
      });
  }

  getPage(res: ISampleObj) {
    if (res.next != null) {
      this.nextPage = res.next;
    } else {
      this.nextPage = '';
    }
    console.log('get next page ', this.nextPage);
    if (res.previous != null) {
      this.previousPage = res.previous;
    } else {
      this.previousPage = '';
    }
    console.log('get pevious page ', this.previousPage);
  }

  toPreviousPage() {
    this.apiSvc
    .get(this.previousPage, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    .then((res: ISampleObj) => {
      this.sampleList = res.results;
      this.getPage(res);
      this.sampleObj = res;
    });
  }

  toNextPage() {
    if (this.nextPage) {
      this.apiSvc
        .get(this.nextPage, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        .then((res: ISampleObj) => {
          this.sampleList = res.results;
          this.getPage(res);
          this.sampleObj = res;
          console.log(res);
        })
        .catch((error) => {
          console.error('Errore durante la richiesta API:', error);
        });
    } else {
      console.warn('URL della pagina successiva non disponibile.');
    }
  }


}

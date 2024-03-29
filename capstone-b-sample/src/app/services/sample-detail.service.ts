import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ISampleDetail } from '../models/i-sample';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class SampleDetailService {

  dataDetail!: ISampleDetail

  constructor(private apiSvc: ApiService) { }

  getDataDetail() {
    return this.dataDetail
  }

  getDetailSample(id: number) {
    this.apiSvc
      .get('https://freesound.org/apiv2/sounds/' + id + '/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        this.dataDetail = this.manageDetailsRes(res);
      })
      .catch((err) => {
        alert('errore');
      });
  }

  manageDetailsRes(res: any) {
    return {
      id: res.id,
      name: res.name,
      tags: res.tags,
      previews: res.previews['preview-hq-mp3'],
      description: res.description,
      type: res.type,
      filesize: res.filesize,
      duration: res.duration,
      username: res.username,
      images: res.images['waveform_l'],
    };
  }

  downloadSample(id: Number) {
    return this.apiSvc
      .get('https://freesound.org/apiv2/sounds/' + id + '/download/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        responseType: 'blob',
      })
      .then((res) => {
        window.location.href =
          'https://freesound.org/apiv2/sounds/' + id + '/download/';
      })
      .catch((err) => {
        alert('errore download');
      });
  }

}

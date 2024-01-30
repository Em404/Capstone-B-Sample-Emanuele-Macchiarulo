import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ISampleDetail } from '../models/i-sample';


@Injectable({
  providedIn: 'root'
})
export class SampleDetailService {

  dataDetail!: ISampleDetail
  preferiti: ISampleDetail[] = []

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
    // const details: ISampleDetail = {
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
    // console.log("dettagli", details);
    // this.setDataDetail(details)
    // this.loadSample(details);
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

  addToFavourite(sample: ISampleDetail) {
    console.log('Chiamato addToFavourite');
    const preferiti = this.getPreferiti();
    const isPresent = preferiti.find((s: ISampleDetail) => s.id === sample.id)
    if(isPresent) {
      localStorage.setItem("preferiti", JSON.stringify(preferiti.filter((s: ISampleDetail) => s.id !== sample.id)))
    } else {
      preferiti.unshift(sample)
      localStorage.setItem('preferiti', JSON.stringify(preferiti))
    }
  }

  getPreferiti(): ISampleDetail[] {
    return JSON.parse(localStorage.getItem('preferiti') || '') || [];
  }

  checkFavourite(sample: ISampleDetail) {
    const preferiti = JSON.parse(localStorage.getItem('preferiti') || '')
    return (preferiti.find((s: ISampleDetail) => s.id === sample.id))
  }

  // deleteFromFavourite(id: number) {
  //   this.preferiti = this.preferiti.filter(pref => pref.id !== id);
  //   localStorage.setItem("preferiti", JSON.stringify(this.preferiti))
  //   console.log(this.preferiti);
  // }

}

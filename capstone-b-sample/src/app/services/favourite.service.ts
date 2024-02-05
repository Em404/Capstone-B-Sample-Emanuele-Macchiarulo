import { Injectable } from '@angular/core';
import { ISampleDetail } from '../models/i-sample';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor() {}

  private preferitiSubject = new BehaviorSubject<ISampleDetail[]>(this.getPreferiti());
  preferiti$ = this.preferitiSubject.asObservable();

  addToFavourite(sample: ISampleDetail) {
    const preferiti = this.getPreferiti();
    const isPresent = preferiti.find((s: ISampleDetail) => s.id === sample.id);
    if (isPresent) {
      // elemento rimosso dai preferiti
      const updatedPreferiti = preferiti.filter((s: ISampleDetail) => s.id !== sample.id);
      this.updatePreferiti(updatedPreferiti);
    } else {
      // elemento aggiunto ai preferiti
      preferiti.unshift(sample);
      this.updatePreferiti(preferiti);
    }
  }

  checkFavourite(sample: ISampleDetail) {
    const preferiti = this.getPreferiti();
    return preferiti.find((s: ISampleDetail) => s.id === sample.id);
  }

  // private getPreferiti(): ISampleDetail[] {
  //   return JSON.parse(localStorage.getItem('preferiti') || '') || [];
  // }

  private getPreferiti(): ISampleDetail[] {
    const preferitiString = localStorage.getItem('preferiti') || '';
    try {
      return JSON.parse(preferitiString) || [];
    } catch (error) {
      console.error('Errore durante il parsing del JSON:', error);
      return [];
    }
  }

  private updatePreferiti(updatedPreferiti: ISampleDetail[]) {
    localStorage.setItem('preferiti', JSON.stringify(updatedPreferiti));
    this.preferitiSubject.next(updatedPreferiti);
  }

}

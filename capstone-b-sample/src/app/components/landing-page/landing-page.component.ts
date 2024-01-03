import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  // images = [
  //   '../../../assets/img/carousel/drums.png',
  //   '../../../assets/img/carousel/fx.png',
  //   '../../../assets/img/carousel/instrumental.png',
  //   '../../../assets/img/carousel/vocals.png',
  // ];

  // backgroundColors = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33'];

  // gradients = [
  //   'linear-gradient(to right, #FF5733, #FFC300)',
  //   'linear-gradient(to right, #33FF57, #00C851)',
  //   'linear-gradient(to right, #5733FF, #9E47FF)',
  //   'linear-gradient(to right, #FFFF33, #FFD000)',
  // ];

  images = [
    {
      src: '../../../assets/img/carousel/drums.png',
      description: 'DRUMS',
      additionalText: 'Testo aggiuntivo 1',
    },
    {
      src: '../../../assets/img/carousel/fx.png',
      description: 'FX',
      additionalText: 'Testo aggiuntivo 2',
    },
    {
      src: '../../../assets/img/carousel/instrumental.png',
      description: 'INSTRUMENTAL',
      additionalText: 'Testo aggiuntivo 3',
    },
    {
      src: '../../../assets/img/carousel/vocals.png',
      description: 'VOCALS',
      additionalText: 'Testo aggiuntivo 4',
    },
  ];

  textColors = ['#5271FF', '#FF66C4', '#FFDE59', '#5CE1E6'];


}

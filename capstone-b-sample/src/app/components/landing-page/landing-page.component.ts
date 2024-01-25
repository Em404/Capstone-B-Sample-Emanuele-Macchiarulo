import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {

  images = [
    {
      src: '../../../assets/img/carousel/drums.png',
      sample: 'DRUMS',
      title: 'con il punch di cui hai bisogno!',
      description: 'Scatena il potere ritmico con i migliori sample di batteria. Percussioni incisive, kick poderose, snare perfetti, hi-hat nitidi e molto altro!',
      subDescription:'Trova il ritmo perfetto per la tua musica.'
    },
    {
      src: '../../../assets/img/carousel/fx.png',
      sample: 'FX',
      title: 'per creare tensione e atomsofera!',
      description: 'Crea atmosfere coinvolgenti con la nostra collezione di transizioni, glitch, risalti cinematici, impatti elettrizzanti e altro ancora!',
      subDescription:'Scorri tra le nostre categorie di FX per trovare il suono che solletica la tua immaginazione.'
    },
    {
      src: '../../../assets/img/carousel/instrumental.png',
      sample: 'INSTRUMENTAL',
      title: 'per melodie catchy!',
      description: 'Indipendentemente dal genere musicale che ami, troverai il sample più adatto a te. Lead, pluck, bassi, pianoforte... La lista è lunga!',
      subDescription:'Ogni nota è un opportunità di creare emozioni uniche.'
    },
    {
      src: '../../../assets/img/carousel/vocals.png',
      sample: 'VOCALS',
      title: 'per aggiungere quel tocco in più alle tue produzioni!',
      description: 'Porta la tua musica al livello successivo con dei sample vocali. Dal coro alla voce solista, dalle frasi ai vocal chop. ',
      subDescription:'Cattura l attenzione dell ascoltatore con i nostri vocal hooks e frasi uniche'
    },
  ];

  textColors = ['#5271FF', '#FF66C4', '#FFDE59', '#5CE1E6'];
}

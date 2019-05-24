import { Injectable } from '@angular/core';
import Tone, { Sampler } from 'tone'

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  constructor() {
  }

  //Public Methods
  public playNote(x: number) {
    var sampler = new Tone.Sampler({
      // "C5": "../../assets/sounds/piano1.mp3",
      // "F5": "../../assets/sounds/piano6.mp3",
      // "C6": "../../assets/sounds/piano13.mp3",
      // "E6": "../../assets/sounds/piano17.mp3"

      "B5": "../../assets/sounds/piano12.mp3"

    }, () => {
      sampler.triggerAttackRelease(this.resolveNote(x, 5), '1n');
    }).toMaster();;

  }

  public changeBpmToMs(bpm: number) {
    return 60 / bpm / 2 * 1000;
  }

  private resolveNote(note, key) {
    switch (note) {
      case 0: return `C${key}`;
      case 1: return `C#${key}`;
      case 2: return `D${key}`;
      case 3: return `D#${key}`;
      case 4: return `E${key}`;
      case 5: return `F${key}`;
      case 6: return `F#${key}`;
      case 7: return `G${key}`;
      case 8: return `G#${key}`;
      case 9: return `A${key}`;
      case 10: return `A#${key}`;
      case 11: return `B${key}`;
      case 12: return `C${key + 1}`;
      case 13: return `C#${key + 1}`;
      case 14: return `D${key + 1}`;
      case 15: return `D#${key + 1}`;
      case 16: return `E${key + 1}`;
      case 17: return `F${key + 1}`;
      case 18: return `F#${key + 1}`;
      case 19: return `G${key + 1}`;
      case 20: return `G#${key + 1}`;
      case 21: return `A${key + 1}`;
      case 22: return `A#${key + 1}`;
      case 23: return `B${key + 1}`;
    }
  }
}

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class SoundService {
//   //Constructor
//   constructor() {
//     this.preloadAudio();
//   }

//   //Public Methods
//   public playNote(x: number) {
//     this.playAudio(x);
//   }

//   public changeBpmToMs(bpm: number) {
//     return 60 / bpm / 2 * 1000;
//   }

//   //Private Methods
//   private playAudio(x: number) {
//     let audio = new Audio();
//     audio.src = `../assets/sounds/piano${x + 1}.mp3`;
//     audio.load();
//     audio.play();
//   }

//   private preloadAudio() {
//     for (let i = 0; i < 23; i++) {
//       let audio = new Audio();
//       audio.src = `../assets/sounds/piano${i + 1}.mp3`;
//       audio.load();

//     }
//   }
// }

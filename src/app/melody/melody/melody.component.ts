import { Component, OnInit, Input } from '@angular/core';
import { Melody } from '../melody.model';
import { SoundService } from '../sound.service';
import * as $ from 'jquery';
import { MelodySketchDataService } from '../melody-sketch-data.service';
import { AuthenticationService } from 'src/app/user/authentication.service';

@Component({
  selector: 'app-melody',
  templateUrl: './melody.component.html',
  styleUrls: ['./melody.component.css']
})
export class MelodyComponent implements OnInit {
  //Attributes
  @Input() public melody: Melody;
  private _timer: NodeJS.Timer;
  private _clock: number;
  private _speed: number;

  loggedInUser$ = this._authenticationService.user$;

  //Constructor
  constructor(
    private _soundService: SoundService,
    private _melodySketchDataService: MelodySketchDataService,
    private _authenticationService: AuthenticationService) {
    this._clock = 31;
  }

  ngOnInit() {
    this.makeDomKeysUnique();
    this._speed = this._soundService.changeBpmToMs(this.melody.bpm)
  }

  ngOnDestroy() {
    this.stop();
  }

  //Public Methods
  public start() {
    clearInterval(this._timer);
    this.play();
  }

  public stop() {
    clearInterval(this._timer);
    this._clock = 31;
  }

  deleteMelody() {
    if (this.isAuthor())
      this._melodySketchDataService.deteleMelody(this.melody.id).subscribe();
  }

  public getEmailLoggedInUser() {
    return this._authenticationService.userEmail$;
  }

  public isAuthor() {
    return this.getEmailLoggedInUser() == this.melody.author.username;
  }

  //Private Methods
  private makeDomKeysUnique() {
    for (let i = 0; i < 24; i++) {
      $(`#${i}`).attr("id", `${this.melody.id}_${i}`);
    }
    $(`#toggle`).attr("id", `toggle_${this.melody.id}`);
  }

  private play() {
    this._timer = setInterval(() => {
      this._clock++;
      if (this._clock > 32 - 1) this._clock = 0;
      this.melody.notes.forEach(note => {
        if (note.xCoor == this._clock) {
          this.playNote(note.yCoor)
          $(`#${this.melody.id}_${note.yCoor}`).addClass('notePushed');
          setTimeout(() => {
            $(`#${this.melody.id}_${note.yCoor}`).removeClass('notePushed');
          }, this._speed);
        }
      });
    }, this._speed);
  }

  private playNote(x) {
    this._soundService.playNote(x);
  }

  public toggleState() {
    var string = `#toggle_${this.melody.id}`

    if ($(string).attr("src") == "../../../assets/images/play-button.svg") {
      $(string).attr("src", "../../../assets/images/stop-button.svg");
      this.start();
    }
    else {
      $(string).attr("src", "../../../assets/images/play-button.svg")
      this.stop();
    }
  }
}

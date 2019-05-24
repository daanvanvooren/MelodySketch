import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { SoundService } from '../sound.service';
declare var $: any;
import { Melody } from '../melody.model';
import { Note } from '../note.model';
import { Midi } from '../../../assets/modules/@tonejs/midi/dist/Midi';

@Component({
  selector: 'app-piano-roll',
  templateUrl: './piano-roll.component.html',
  styleUrls: ['./piano-roll.component.css']
})
export class PianoRollComponent implements OnInit {
  //Attributes
  @Input() public melody: Melody;
  @Output() public notesOuput = new EventEmitter<Array<Note>>(); //Ouput the notes to the addMelody

  private _timer: NodeJS.Timer;
  private _clock: number;
  private _speed: number;

  // private _spaceBarPress: boolean;
  // @Input() inputFocus: boolean;

  private _colorLight: string;
  private _colorDark: string;
  private _colorClicked: string;
  private _colorStroke: string;
  private _strokeWidth: string;

  private _coordinates = new Set(); //Strings 'x,y'

  //Constructor
  constructor(
    private _soundService: SoundService) {
    this._clock = 31;

    //Aanpassen!
    this._speed = _soundService.changeBpmToMs(120);

    this._colorLight = '#d7d8e1';
    this._colorDark = '#ccccd4'
    this._colorClicked = 'red';
    this._colorStroke = 'gray';
    this._strokeWidth = '1px';
  }

  ngOnInit() {
    this.uploaden();
    this.uploadMidi();

    // this.spacebarEventlistener();

    this.renderGrid();
    this.renderTimeline();
    this.renderStroke();
    document.getElementById(`tl0`).setAttribute('fill', this._colorClicked);//Init color


    if (this.melody != null) {
      this._speed = this._soundService.changeBpmToMs(this.melody.bpm)
      this._coordinates = this.dataToSet(this.melody.notes);
      this.renderNotesFromDb();
    }
  }

  ngOnDestroy() {
    this.stop();
  }

  public start() {
    // this._spaceBarPress = false;

    clearInterval(this._timer);
    this.play();
  }

  public stop() {
    // this._spaceBarPress = true;

    clearInterval(this._timer);
    for (let x = 0; x < 32; x++) {
      var noteDom = document.getElementById(`tl${x}`);
      noteDom.setAttribute('fill', noteDom.getAttribute('originalColor'));
    }
    document.getElementById(`tl0`).setAttribute('fill', this._colorClicked);//Init color
    document.getElementById(`tl0`).setAttribute('fill', this._colorClicked);//Init color

    document.getElementById('timeStroke').setAttribute('x', `0`);
    this._clock = 31;
  }

  public clearGrid() {
    this._coordinates.forEach(note => {
      var data = note.split(',');
      var x = Number(data[0]);
      var y = Number(data[1]);

      var noteDom = document.getElementById(`${x},${y}`);
      noteDom.setAttribute('fill', noteDom.getAttribute('originalColor'));
    });
    this._coordinates.clear();

    //Notifien
    this.notifyParent(this._coordinates);
  }

  //Private methods
  private renderGrid() {
    for (let x = 0; x < 32; x++) {
      for (let y = 0; y < 24; y++) {
        var temp = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        temp.setAttribute('id', `${x},${y}`);
        temp.setAttribute('x', `${0 + 32 * x}`);
        temp.setAttribute('y', `${391 - 17 * y}`);
        temp.setAttribute('width', '32');
        temp.setAttribute('height', '17');
        if (x < 8 || x >= 16 && x < 24) {
          temp.setAttribute('fill', this._colorDark);
          temp.setAttribute('originalColor', this._colorDark);
          temp.addEventListener('mousedown', this.noteClicked.bind(this, `${x},${y}`));
        } else {
          temp.setAttribute('fill', this._colorLight);
          temp.setAttribute('originalColor', this._colorLight);
          temp.addEventListener('mousedown', this.noteClicked.bind(this, `${x},${y}`));
        }
        temp.setAttribute('stroke', this._colorStroke);
        temp.setAttribute('stroke-width', this._strokeWidth);

        $('#grid').append(temp);
      }
    }
  }

  private renderTimeline() {
    for (let x = 0; x < 32; x++) {
      var temp = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
      temp.setAttribute('id', `tl${x}`);
      temp.setAttribute('x', `${0 + 32 * x}`);
      temp.setAttribute('y', '0');
      temp.setAttribute('width', '32');
      temp.setAttribute('height', '17');
      if (x < 8 || x >= 16 && x < 24) {
        temp.setAttribute('fill', this._colorDark);
        temp.setAttribute('originalColor', this._colorDark);
        temp.addEventListener('mousedown', this.noteClickedTl.bind(this, x));

      } else {
        temp.setAttribute('fill', this._colorLight);
        temp.setAttribute('originalColor', this._colorLight);
        temp.addEventListener('mousedown', this.noteClickedTl.bind(this, x));
      }
      temp.setAttribute('stroke', this._colorStroke);
      temp.setAttribute('stroke-width', this._strokeWidth);
      $('#timeline').append(temp);
    }
  }

  private noteClicked(clickData) {
    var data = clickData.split(',');
    var x = Number(data[0]);
    var y = Number(data[1]);
    var noSoundWhenClicked = Number(data[2]);

    var note = document.getElementById(`${x},${y}`);
    if (note.getAttribute('fill') == this._colorLight || note.getAttribute('fill') == this._colorDark) {
      note.setAttribute('fill', this._colorClicked);
      this._coordinates.add(`${x},${y}`);
      if (noSoundWhenClicked != 1) {
        this._soundService.playNote(y);
      }
    }
    else {
      note.setAttribute('fill', note.getAttribute('originalColor'));
      this._coordinates.delete(`${x},${y}`);
    }

    //Notifien
    this.notifyParent(this._coordinates);
  }

  private noteClickedTl(x) {
    var note = document.getElementById(`tl${this._clock}`);
    note.setAttribute('fill', note.getAttribute('originalColor'));
    this._clock = x - 1;
  }

  private play() {
    this._timer = setInterval(() => {
      this._clock++;
      if (this._clock > 32 - 1) this._clock = 0;
      this.playNote();
      document.getElementById('timeStroke').setAttribute('x', `${this._clock * 32}`);
      var note = document.getElementById(`tl${this._clock}`);
      note.setAttribute('fill', this._colorClicked);
      if (this._clock == 0) {
        var note = document.getElementById(`tl${31}`);
        note.setAttribute('fill', 'white');
        note.setAttribute('fill', note.getAttribute('originalColor'));
      }
      else {
        var note = document.getElementById(`tl${this._clock - 1}`);
        note.setAttribute('fill', note.getAttribute('originalColor'));
      }
    }, this._speed);
  }

  private renderStroke() {
    var temp = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    temp.setAttribute('id', 'timeStroke');
    temp.setAttribute('x', '0');
    temp.setAttribute('y', '0');
    temp.setAttribute('width', '1');
    temp.setAttribute('height', '408');
    temp.setAttribute('fill', '#636363');
    $('#grid').append(temp);
  }

  private playNote() {
    this._coordinates.forEach(noot => {
      var coor = noot.split(',');
      var x = Number(coor[0]);
      var y = Number(coor[1]);
      if (x == this._clock) {
        this._soundService.playNote(y);
      }
    });
  }

  private dataToSet(notes) {
    var set = new Set();
    notes.forEach(note => {
      set.add(`${note.xCoor},${note.yCoor}`)
    });
    return set;
  }

  private setToData(note: Set<string>) {
    var data = new Array<Note>();
    note.forEach(note => {
      var coor = note.split(',');
      var x = Number(coor[0]);
      var y = Number(coor[1]);
      data.push(new Note(x, y));
    });
    return data;
  }

  private renderNotesFromDb() {
    //Fill Grid
    this._coordinates.forEach(note => {
      var data = note.split(',');
      var x = Number(data[0]);
      var y = Number(data[1]);

      var noteDom = document.getElementById(`${x},${y}`);
      noteDom.setAttribute('fill', this._colorClicked);
    });
  }

  //Ouput
  public notifyParent(notes: Set<string>): void {
    this.notesOuput.emit(this.setToData(notes));
  }

  // public toggleState() {
  //   if ($('#toggle').attr("src") == "../../../assets/images/play-button.svg") {
  //     $('#toggle').attr("src", "../../../assets/images/stop-button.svg");
  //     this.start();
  //   }
  //   else {
  //     $('#toggle').attr("src", "../../../assets/images/play-button.svg")
  //     this.stop();
  //   }
  // }

  public toggleState() {
    if ($('#toggle i').attr("class") == "fa fa-play") {
      $('#toggle i').attr("class", "fa fa-stop");
      this.start();
    }
    else {
      $('#toggle i').attr("class", "fa fa-play")
      this.stop();
    }
  }




  //Midi
  private loadMidi(event) {

    var tmppath = URL.createObjectURL(event.target.files[0]);

    Midi.fromUrl(tmppath).then(midi => {

      this.clearGrid();

      let noteSet = new Set();


      try {
        let bpm = midi.header.tempos[0].bpm;
        let notes = midi.tracks[0].notes;

        notes.forEach(note => {
          let x = note.ticks / 48;
          let y = note.midi - 60;
          noteSet.add(`${x},${y}`);
          this.noteClicked(`${x},${y},1`);

        });
      }
      catch (err) {
        $('#midiFailedModal').modal('show');
        noteSet.clear();
        this.clearGrid();
        this.clearInput();
      }

      this._coordinates = noteSet;
    })
  }

  private uploadMidi() {
    let input = $('#file')[0];
    input.addEventListener('change', this.loadMidi.bind(this));
  }

  private uploaden() {
    var inputs = document.querySelectorAll('.inputfile');
    Array.prototype.forEach.call(inputs, function (input) {
      var label = input.nextElementSibling,
        labelVal = label.innerHTML;

      input.addEventListener('change', function (e) {
        var fileName = '';
        if (this.files && this.files.length > 1)
          fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        else
          fileName = e.target.value.split('\\').pop();

        if (fileName)
          label.querySelector('span').innerHTML = geefNaam(fileName);
        else
          label.innerHTML = labelVal;

        function geefNaam(naam) {
          if (naam.length > 20) {
            return naam.substring(0, 19) + "...";
          } else
            return naam;
        }
      });
    });
  }

  public clearInput() {
    $("#file").val('');
    $("#fileLabel").html('<i class="fa fa-upload"></i>&nbsp;<span>UPLOAD MIDI FILE...');
  }

  // private spacebarEventlistener() {
  //   window.addEventListener('keydown', (e) => {
  //     if (e.keyCode == 32 && !this.inputFocus) {
  //       this.toggleState();
  //       if (!this._spaceBarPress) {
  //         this.start();
  //       } else {
  //         this.stop();
  //       }
  //     }
  //   });
  //   window.onkeydown = (e) => {
  //     if (!this.inputFocus)
  //       return !(e.keyCode == 32);
  //   };
  // }

  public changeBPM(bpm) {
    if (bpm >= 20 && bpm <= 500) {
      this._speed = this._soundService.changeBpmToMs(bpm);
      this.stop();
      this.start();
    }
  }
}

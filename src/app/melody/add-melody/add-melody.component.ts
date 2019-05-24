import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Melody } from '../melody.model';
import { MelodySketchDataService } from '../melody-sketch-data.service';
import { Note } from '../note.model';
import { User } from '../user.model';
import { AuthenticationService } from 'src/app/user/authentication.service';
import { PianoRollComponent } from '../piano-roll/piano-roll.component';
declare var $ : any;

@Component({
  selector: 'app-add-melody',
  templateUrl: './add-melody.component.html',
  styleUrls: ['./add-melody.component.css']
})
export class AddMelodyComponent implements OnInit {


  @ViewChild(PianoRollComponent) pianoRollChild:PianoRollComponent;

  public melody: FormGroup; //Input from db in needed
  public errorMsg: string;

  public _notes = new Array<Note>(); //Notes from child

  public inputFocus: boolean = false;

  constructor(
    private _melodySketchDataService: MelodySketchDataService,
    private _authenticationService: AuthenticationService,
    private _fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.melody = this._fb.group({
      bpm: ['', [Validators.required, Validators.min(20), Validators.max(500), Validators.pattern("^[0-9]+$")]],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    this._melodySketchDataService
      .addNewMelody(new Melody(
        new User(this._authenticationService.userEmail$, "", ""),
        new Date(),
        this._notes,
        this.melody.value.bpm,
        this.melody.value.name,
        this.melody.value.description
      ))
      .subscribe();
    $('#submittedModal').modal('show');
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'is required';
    } else if (errors.min || errors.max) {
      return 'BPM needs to be between 20 and 500';
    } else if (errors.pattern) {
      return 'No decimals';
    }
  }

  //Methods
  public getNotes(notes: Array<Note>) { //Input from pianoRoll
    this._notes = notes;
  }

  // public inputFieldFocus() {
  //   this.inputFocus = true;
  // }

  // public inputFieldFocusOut() {
  //   this.inputFocus = false;
  // }

  public changeBPMOfPianoRoll() {
    this.pianoRollChild.changeBPM(this.melody.value.bpm);
  }
}

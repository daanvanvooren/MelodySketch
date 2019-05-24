import { Component, OnInit } from '@angular/core';
import { Melody } from '../melody/melody.model';
import { MelodySketchDataService } from '../melody/melody-sketch-data.service';
import { AuthenticationService } from '../user/authentication.service';
import { Observable } from 'rxjs';
import { User } from '../melody/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //Attributes
  public melodies: Melody[];
  private _fetchUser$: Observable<User>;
  

  //Constructor
  constructor(
    private _melodySketchDataService: MelodySketchDataService,
    private _authenticationService: AuthenticationService) {
  }

  ngOnInit() {

    this._melodySketchDataService.refreshNeeded$.subscribe(
      () => {
        this.getOwnMelodies();
      }
    );

    this.getOwnMelodies();
    
    this._fetchUser$ = this._melodySketchDataService.getUser$(this.getUserEmail());
  }

  getOwnMelodies() {
    this._melodySketchDataService.mymelodies$.subscribe(
      (melodies: Melody[]) => this.melodies = melodies
    );
  }

  get user$(): Observable<User> { 
    return this._fetchUser$;
  }

  deleteMelody(id) {
    this._melodySketchDataService.deteleMelody(id).subscribe();
  }

  getUserEmail() {
    return this._authenticationService.userEmail$;
  }
}

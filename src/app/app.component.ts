import { Component, ElementRef } from '@angular/core';
import { Melody } from './melody/melody.model';
import { MelodySketchDataService } from './melody/melody-sketch-data.service';
import { Subject, Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Attributes
  public title = 'MelodySketch';
  private _fetchMelodies$: Observable<Melody[]>
    = this._melodySketchDataService.melodies$;

  private _fetchMelody$: Observable<Melody>
    = this._melodySketchDataService.getMelody$(3);

  //Constructor
  constructor(private _melodySketchDataService: MelodySketchDataService,
    private elementRef: ElementRef) {
  }

  //Methods
  ngAfterViewInit() {
    //Background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f2f2f2';
  }

  get melodies$(): Observable<Melody[]> {
    return this._fetchMelodies$;
  }

  get melody$(): Observable<Melody> { //Isn't used atm, used for plotting melody from db in pianoRoll
    return this._fetchMelody$;
  }
}

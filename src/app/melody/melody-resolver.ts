import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Melody } from './melody.model';
import { MelodySketchDataService } from './melody-sketch-data.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MelodyResolver implements Resolve<Melody> {
    constructor(private _melodySketchDataService: MelodySketchDataService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<Melody> {
        return this._melodySketchDataService.getMelody$(route.params['id']);
    }
}
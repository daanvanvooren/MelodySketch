import { Injectable } from '@angular/core';
import { Melody } from './melody.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Comment } from './comment.model';

@Injectable({
  providedIn: 'root'
})
export class MelodySketchDataService {
  //Attributes
  private _refreshNeeded$ = new Subject<void>();


  //Constructor
  constructor(private http: HttpClient) { }

  //Get calls
  get melodies$(): Observable<Melody[]> {
    return this.http.get(`https://melodysketchapi.azurewebsites.net/api/melodies/`).pipe(
      map(
        (list: any[]): Melody[] => list.map(Melody.fromJSON)
      )
    );
  }

  get mymelodies$(): Observable<Melody[]> {
    return this.http.get(`https://melodysketchapi.azurewebsites.net/api/melodies/mymelodies/`).pipe(
      map(
        (list: any[]): Melody[] => list.map(Melody.fromJSON)
      )
    );
  }

  getMelody$(id): Observable<Melody> {
    return this.http.get(`https://melodysketchapi.azurewebsites.net/api/melodies/${id}`).pipe(
      map(
        (mel: any): Melody => Melody.fromJSON(mel)
      )
    );
  }

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getcomments$(melodyId): Observable<Comment[]> {
    return this.http.get(`https://melodysketchapi.azurewebsites.net/api/comments/${melodyId}`).pipe(
      map(
        (list: any[]): Comment[] => list.map(Comment.fromJSON)
      )
    );
  }

  getUser$(username): Observable<User> {
    return this.http.get(`https://melodysketchapi.azurewebsites.net/api/users/${username}`).pipe(
      map(
        (user: any): User => User.fromJSON(user)
      )
    );
  }

  //Post calls
  addNewMelody(melody: Melody) {
    return this.http.post(`https://melodysketchapi.azurewebsites.net/api/melodies/`,
      melody.toJSON());
  }

  deteleMelody(id: Number): Observable<{}> {
    return this.http.delete(`https://melodysketchapi.azurewebsites.net/api/melodies/${id}`)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  addNewComment(comment: Comment) {
    return this.http.post(`https://melodysketchapi.azurewebsites.net/api/comments/`,
      comment.toJSON())
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deteleComment(id: Number): Observable<{}> {
    return this.http.delete(`https://melodysketchapi.azurewebsites.net/api/comments/${id}`)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }
}
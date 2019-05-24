import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MelodySketchDataService } from '../melody-sketch-data.service';
import { Melody } from '../melody.model';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-melody-detail',
  templateUrl: './melody-detail.component.html',
  styleUrls: ['./melody-detail.component.css']
})
export class MelodyDetailComponent implements OnInit {
  //Attributes
  public melody: Melody;
  public comments: Comment[];

  //Constructors
  constructor(
    private _route: ActivatedRoute,
    private _melodySketchDataService: MelodySketchDataService) {
  }

  //Functions
  ngOnInit() {
    this._route.data.subscribe(item =>
      this.melody = item['melody']);

    this._melodySketchDataService.refreshNeeded$.subscribe(
      () => {
        this.getAllComments();
      }
    );
    this.getAllComments();
  }

  getAllComments() {
    this._melodySketchDataService.getcomments$(this.melody.id).subscribe(
      (comments: Comment[]) => this.comments = comments
    );
  }
}

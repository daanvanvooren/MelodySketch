import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/user/authentication.service';
import { MelodySketchDataService } from '../melody-sketch-data.service';
import { Comment } from '../comment.model'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() public comment: Comment;

  constructor(
    private _melodySketchDataService: MelodySketchDataService,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  deleteComment() {
    if (this.isAuthor())
      this._melodySketchDataService.deteleComment(this.comment.id).subscribe();
  }

  public getEmailLoggedInUser() {
    return this._authenticationService.userEmail$;
  }

  public isAuthor() {
    return this.getEmailLoggedInUser() == this.comment.author.username;
  }

}
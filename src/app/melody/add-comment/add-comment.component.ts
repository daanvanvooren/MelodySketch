import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/user/authentication.service';
import { MelodySketchDataService } from '../melody-sketch-data.service';
import { Comment } from '../comment.model';
import { User } from '../user.model';
import { Melody } from '../melody.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  public addcomment: FormGroup; //Input from db in needed
  public errorMsg: string;
  @Input() public melody: Melody;

  constructor(
    private _melodySketchDataService: MelodySketchDataService,
    private _authenticationService: AuthenticationService,
    private _fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.addcomment = this._fb.group({
      comment: ['', Validators.required]
    });
  }

  onSubmit() {
    this._melodySketchDataService
      .addNewComment(new Comment(
        new Date(),
        this.addcomment.value.comment,
        new User(this._authenticationService.userEmail$, "", ""),
        this.melody)
      )
      .subscribe();
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'is required';
    }
  }
}








import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Components
import { UserComponent } from './user/user.component';
import { MelodyComponent } from './melody/melody.component';
import { NoteComponent } from './note/note.component';
import { PianoRollComponent } from './piano-roll/piano-roll.component';
import { AddMelodyComponent } from './add-melody/add-melody.component';
import { MelodyListComponent } from './melody-list/melody-list.component';
import { CommentComponent } from './comment/comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';

//API
import { HttpClientModule } from '@angular/common/http';

//Form
import { ReactiveFormsModule } from '@angular/forms';

//Material
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { MelodyDetailComponent } from './melody-detail/melody-detail.component';

//Resolver
import { MelodyResolver } from './melody-resolver';
import { AuthGuard } from '../user/auth.guard';

const routes = [
  { path: 'list', component: MelodyListComponent },
  { path: 'add', component: AddMelodyComponent, canActivate: [AuthGuard] },
  {
    path: ':id', component: MelodyDetailComponent, canActivate: [AuthGuard],
    resolve: { melody: MelodyResolver }
  }
];

@NgModule({
  declarations: [
    MelodyComponent,
    NoteComponent,
    UserComponent,
    PianoRollComponent,
    AddMelodyComponent,
    MelodyListComponent,
    MelodyDetailComponent,
    CommentComponent,
    AddCommentComponent,
  ],
  imports: [
    CommonModule,

    //Material
    FlexLayoutModule,
    MaterialModule,

    //API
    HttpClientModule,

    //Form
    ReactiveFormsModule,

    //Routes
    RouterModule.forChild(routes),
  ],
  exports: [
  ]
})
export class MelodyModule { }

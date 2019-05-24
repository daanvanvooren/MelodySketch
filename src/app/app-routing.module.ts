import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  { path: 'melody',
    //canActivate: [ AuthGuard ], //The whole melody path is protected
    loadChildren: './melody/melody.module#MelodyModule',
  },
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ]},
  { path: '', redirectTo: 'melody/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Componenten
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';

//Routing
import { AppRoutingModule } from './app-routing.module';

//Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

//API
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    PageNotFoundComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

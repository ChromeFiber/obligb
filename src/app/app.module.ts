import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {environment} from "../environments/environment";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {FormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire";
import { SykkelkategoriComponent } from './sykkelkategori/sykkelkategori.component';
import { SyklerComponent } from './sykler/sykler.component';


@NgModule({
  declarations: [
    AppComponent,
    SykkelkategoriComponent,
    SyklerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

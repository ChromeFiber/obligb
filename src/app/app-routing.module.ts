import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SykkelkategoriComponent} from "./sykkelkategori/sykkelkategori.component";
import {SyklerComponent} from "./sykler/sykler.component";

const routes: Routes = [
  {path: '', component:SykkelkategoriComponent },
  {path: 'sykkel/:kategori', component:SyklerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

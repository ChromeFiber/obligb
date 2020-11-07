import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {SyklerService} from "../service/sykler.service";

@Component({
  selector: 'app-sykler',
  templateUrl: './sykler.component.html',
  styleUrls: ['./sykler.component.scss']
})
export class SyklerComponent implements OnInit {
  catId: string;
  sykkel: Array<object>;
  dataStatus: string = 'Add';
  todoValue: string;
  todoId: string;
  sykkelPris: number;
  fabrikk: string;
  constructor(private sykkelService: SyklerService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.catId = this.activatedRoute.snapshot.paramMap.get('kategori');
    this.sykkelService.visSykkel(this.catId).subscribe(value => {
      this.sykkel = value;
      console.log(this.sykkel);
    })
  }
  onSubmit(f: NgForm, fr: NgForm, fb: NgForm) {

      let todo= {
        betegnelse: f.value.todoText,
        dagpris: fr.value.prisTekst,
        fabrikk: fb.value.fabrikk,
        ledig: false,
      }
      this.sykkelService.lagreSykkel(this.catId, todo);

  }
}

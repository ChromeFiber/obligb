import {Component, OnInit} from '@angular/core';
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
  statusTekst: string = 'Legg til sykkel';
  sykkelVerdi: string;
  todoId: string;
  sykkelPris: number;
  fabrikk: string;
  sykId: string;
  betegnelse: string = "";
  dagpris: number = 0.0;
  sykFabrikk: string = "";
  ledig: boolean = false;
  constructor(private sykkelService: SyklerService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.catId = this.activatedRoute.snapshot.paramMap.get('kategori');
    this.sykkelService.visSykkel(this.catId).subscribe(value => {
      this.sykkel = value;
      console.log(this.sykkel);
    })
  }

  onSubmit(f: NgForm, fr: NgForm, fb: NgForm) {
    if (this.statusTekst == "Legg til sykkel") {
      let sykkelInfo = {
        betegnelse: f.value.todoText,
        dagpris: fr.value.prisTekst,
        fabrikk: fb.value.fabrikk,
        ledig: false,
      }
      this.sykkelService.lagreSykkel(this.catId, sykkelInfo);
      f.resetForm();
      fr.resetForm();
      fb.resetForm();
    } else if (this.statusTekst == 'Oppdater sykkel') {

      this.sykkelService.oppdaterSykkel(this.catId, this.sykId, f.value.todoText, fr.value.prisTekst, fb.value.fabrikk);
      f.resetForm();
      fr.resetForm();
      fb.resetForm();
    }
  }

  onEdit(betegnelse: string,  id: string) {
    this.betegnelse= betegnelse;
    this.statusTekst = "Oppdater sykkel";
    this.sykId = id;
  }

  onDelete(id: string) {
    this.sykkelService.slettSykkel(this.catId, id);
  }
}

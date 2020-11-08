import {Component, OnInit} from '@angular/core';
import {SykkelKategoriService} from '../service/sykkel-kategori.service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-sykkelkategori',
  templateUrl: './sykkelkategori.component.html',
  styleUrls: ['./sykkelkategori.component.scss']
})
export class SykkelkategoriComponent implements OnInit {
  sykkelKategorier: Array<object>;
  categoryName: string = "";
  dataStatus: string = 'Add';
  statusTekst: string = "Legg til kategori"
  oppdatertKatNavn: string;
  katId: string;

  constructor(private sks: SykkelKategoriService) {
  }

  ngOnInit(): void {
    this.sks.loadCategories().subscribe(value => {
      this.sykkelKategorier = value;
      console.log(value);
    });
  }

  onSubmit(f: NgForm) {
    if (this.statusTekst == "Legg til kategori") {
      let katInfo = {
        kategori: f.value.categoryName,
        antSykkel: 0,
      }
      this.sks.nyKategori(katInfo);
    } else if (this.statusTekst == "Oppdater kategori") {
      this.sks.oppdaterKategori(this.katId, f.value.categoryName);
      f.resetForm();
      this.statusTekst = "Legg til kategori";
    }

  }

  onEdit(kategori: string, id: string) {
    this.categoryName = kategori;
    this.statusTekst = "Oppdater kategori";
    this.katId = id;
  }

  onDelete(id: string) {
    this.sks.slettKategori(id);
  }
}

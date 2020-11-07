import { Component, OnInit } from '@angular/core';
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
  sykId: string;
  constructor(private sks: SykkelKategoriService) { }

  ngOnInit(): void {
    this.sks.loadCategories().subscribe(value => {
      this.sykkelKategorier = value;
      console.log(value);
    });
  }
  onSubmit(f: NgForm) {
    let katInfo = {
      kategori: f.value.categoryName,
      antSykkel: 0,
    }
    this.sks.nyKategori(katInfo);
    //console.log(randomNum);
  }
}

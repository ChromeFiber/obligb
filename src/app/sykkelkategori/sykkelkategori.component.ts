import { Component, OnInit } from '@angular/core';
import {SykkelKategoriService} from '../service/sykkel-kategori.service';
@Component({
  selector: 'app-sykkelkategori',
  templateUrl: './sykkelkategori.component.html',
  styleUrls: ['./sykkelkategori.component.scss']
})
export class SykkelkategoriComponent implements OnInit {
  sykkelKategorier: Array<object>;
  constructor(private sks: SykkelKategoriService) { }

  ngOnInit(): void {
    this.sks.loadCategories().subscribe(value => {
      this.sykkelKategorier = value;
      console.log(value);
    });
  }

}

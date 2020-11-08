import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";

import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SykkelKategoriService {

  constructor(private afs: AngularFirestore) {
  }

  loadCategories() {
    return this.afs.collection('modell').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const kategori = a.payload.doc.id;
          return {kategori, data}
        })
      })
    )
  }

  nyKategori(data) {
    this.afs.collection('modell').add(data)
      .then(ref => {
        console.log('Ny kategori er lagret!');
      });
  }

  oppdaterKategori(id: string, oppdatertKategori) {
    this.afs.doc('modell/' + id).update({
      kategori: oppdatertKategori
    }).then(() => {
      console.log("Oppdatert kategori");
    })
  }

  slettKategori(id: string) {
    this.afs.doc('modell/' + id).delete()
      .then(() => {
        console.log("Kategori slettet");
      })
  }
}

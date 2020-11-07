import { Injectable } from '@angular/core';
import{AngularFirestore} from "@angular/fire/firestore";

import {map} from "rxjs/operators";
import firebase from "firebase";

import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root'
})
export class SyklerService {

  constructor(private afs: AngularFirestore) { }

  lagreSykkel(id: string, data){
    this.afs.collection('modell').doc(id).collection('sykkel')
      .add(data)
      .then(ref=> {
        this.afs.doc('modell/'+id).update({
          antSykkel: firestore.FieldValue.increment(1)
        });
        console.log('Ny sykkel registrert!');
      });
  }
  visSykkel(id: string){
    return this.afs.collection('modell').doc(id).collection('sykkel').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
    )
  }

  loadCategories(){
    return this.afs.collection('modell').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const kategori = a.payload.doc.id;
          return {kategori, data}
        })
      })
    )
  }

  oppdaterSykkel(modellId: string, sykkelId: string, oppdatertData: string){
    this.afs.collection('modell').doc(modellId).collection('todos').doc(sykkelId).update({
      todo: oppdatertData
    }).then(()=>{
      console.log('Sykkel redigert suksessfult!');
    });
  }
  slettSykkel(modellId: string, sykkelId: string){
    this.afs.collection('modell').doc(modellId).collection('sykkel').doc(sykkelId).delete().then(()=>{
      this.afs.doc('categories/'+modellId).update({
        todoCount: firestore.FieldValue.increment(-1)
      });
      console.log('Sykkel er sletta suksessfult!');
    });

  }
}

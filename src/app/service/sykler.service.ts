import { Injectable } from '@angular/core';
import{AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import firebase from "firebase";
import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root'
})
export class SyklerService {
  funnet: boolean = false;
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
  //sorter etter dagpris
/*  visKonsoll(katId: string) {
    this.afs.collection('modell').doc(katId).collection('sykkel').ref.where('ledig', '==', false).get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        console.log("ny "+JSON.stringify(doc.data()))
      })
    })
  }*/
  //chaine wheres. blir some 'AND' i mysql

  visKonsoll1(katId: string) {

      this.afs.collection('modell').doc(katId).collection('sykkel').ref
        .where('betegnelse', '==', 'medita')
        .where('dagpris', '>', '100')
        .where('ledig', '==', true)
        .get().then((snapshot) => {
          snapshot.docs.forEach(doc => {
            console.log("ny "+JSON.stringify(doc.data()))
          })
      })
    }


  lastKategorier(){
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

  oppdaterSykkel(modellId: string, sykkelId: string, oppdatertData: string, dp: number, fb: string){
    this.afs.collection('modell').doc(modellId).collection('sykkel').doc(sykkelId).update({
      betegnelse: oppdatertData,
      dagpris: dp,
      fabrikk: fb
    }).then(()=>{
      console.log('Sykkel redigert suksessfult!');
    });
  }
  slettSykkel(modellId: string, sykkelId: string){
    this.afs.collection('modell').doc(modellId).collection('sykkel').doc(sykkelId).delete().then(()=>{
      this.afs.doc('modell/'+modellId).update({
        antSykkel: firestore.FieldValue.increment(-1)
      });
      console.log('Sykkel er sletta suksessfult!');
    });
  }
  setLedig(modellId: string, sykkelId: string){
    this.afs.collection('modell').doc(modellId).collection('sykkel').doc(sykkelId).update({
      ledig:true,
    })
  }
}

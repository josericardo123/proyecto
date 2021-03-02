import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disp } from './disp.model';

@Injectable()
export class DispServices{
private _url:string = "http://localhost:3030/api/disp";

  /* private dispositivos:Disp[]=[
    new Disp("lampara1","lampara sobre escritorio",false,1),
    new Disp("ventilador","Ventilador habitacion 2",true,2),
    new Disp("TV","TV habitacion 1",false,3),
    new Disp("lampara2","lampara sobre buro",true,1)
  ]; */

  constructor (private http:HttpClient){
  
  }
  getAll():Observable<Disp[]>{
  //getAll(){
    //Regresa una copia del listado
    //return [...this.dispositivos];
    return this.http.get<Disp[]>(this._url);
  }

  addDisp(nombre:string, 
    descripcion:string, 
    estatus:boolean, 
    tipo:number): Observable<Disp>{
    const d = new Disp(nombre, descripcion, estatus, tipo);
    // this.dispositivos.push(d);
    return this.http.post<Disp>(this._url, d);
  }

  getByIdOn(pId: string): Promise<any>{
    return this.http.get<any>(`${this._url}/on/${pId}`).toPromise();
  }

  getByIdOff(pId: string): Promise<any>{
    return this.http.get<any>(`${this._url}/off/${pId}`).toPromise();
  }

  // getOne(msg): Observable<Disp>{
  //   return this.http.get<Disp>(`${this._url}/${msg}`);

  // }


  
}

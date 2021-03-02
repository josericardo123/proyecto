import { Component, OnInit } from '@angular/core';
import { Disp } from '../disp.model';
import { DispServices } from '../disp.service';

@Component({
    selector:'app-ec-disp',
    templateUrl:'./ec-disp.component.html',
    styleUrls:['./ec-disp.component.css']
})
  export class EcDispComponent implements OnInit{
    listadoDispositivos:Disp[]=[];
  
    constructor(public dispService: DispServices){
  
    }
  
    ngOnInit(): void {
      // this.listadoDispositivos=this.dispService.getAll();
      this.dispService.getAll()
        .subscribe(r=>{
          this.listadoDispositivos=r;
        });
    }

    ngOnDestroy(){

    }
  
    onDispCreado(){
      //Actualizar el listado
      //this.listadoDispositivos=this.dispService.getAll();
      this.dispService.getAll()
        .subscribe(r=>{
          this.listadoDispositivos=r;
        });
    }
  }
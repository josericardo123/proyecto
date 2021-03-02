import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Disp} from '../disp.model';
import { DispServices } from '../disp.service';
import { WebSocketServices } from '../websocket.service';
import { webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Component({
  selector:'app-ec-iot',
  templateUrl:'./ec-iot.component.html',
  styleUrls:['./ec-iot.component.css'],
})
export class EcIotComponent implements OnInit{
  listadoDispositivos:Disp[]=[];
  //@Output() estatusActualizado = new EventEmitter();

  constructor(public dispService: DispServices, 
              public webSocket: WebSocketServices){
    
  }

   
  //Este metodo obtiene el listado de dispositivos
  ngOnInit(): void {
    this.dispService.getAll().subscribe(r=>{
      this.listadoDispositivos=r;
    });
    this.webSocket.suscribe_websocket();
    this.webSocket.estatusActualizado.subscribe(
      msg => {
        //console.log(msg['estatus']);
        this.updateEstatus(msg);
      },
      err => {
        console.log(err)

    });
  }
  
  async onClickOn(dispId){
    try{
      const disp = await this.dispService.getByIdOn(dispId);
      console.log(disp);
    }catch(error){
      console.log(error);
    }
  }

  async onClickOff(dispId){
    try{
      const disp = await this.dispService.getByIdOff(dispId);
      console.log(disp);
    }catch(error){
      console.log(error);
    }
  }

  // sendMessageToServer(){
  //   let message = 'hola desde angular';
  //   this.webSocket.send(message);
  // }

  updateEstatus(msg){
    let i = 0;
    for(i ; i < this.listadoDispositivos.length; i ++){
      //console.log(this.listadoDispositivos[i]._id);
      if (this.listadoDispositivos[i]._id == msg['_id']){
        //console.log(this.listadoDispositivos[i].estatus);
        this.listadoDispositivos[i].estatus = msg['estatus'];
      }
    }
    
  }

  // onEstatusActualizado(msg){   
  //   this.dispService.getOne(msg).subscribe(r=>{
  //     this.Dispositivo=r;
  //     console.log(this.Dispositivo['estatus']);
  //   });

  // }

      
}

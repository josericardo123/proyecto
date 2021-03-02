import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Injectable()
export class WebSocketServices {
    myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:8000');
    @Output() estatusActualizado = new EventEmitter<any>();
    estatusActualizadoObservable = this.estatusActualizado.asObservable();
    constructor (){

    }
    
    suscribe_websocket() {
        this.myWebSocket.subscribe(
            msg => { this.estatusActualizado.emit(msg);
                 console.log('mensaje recibido: ' + msg);
            },
            // Called whenever there is a message from the server
            err => console.log(err),
            // Called if WebSocket API signals some kind of error
            () => console.log('complete'),
            // Called when connection is closed (for whatever reason)
         );
    }
    suscribe_socket(){
        this.myWebSocket.subscribe();
    }

    close_socket(){
        this.myWebSocket.complete();
    }

    send(message) {
        this.myWebSocket.next(message);
      }

    


}
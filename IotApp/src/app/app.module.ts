//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Http handlers
import { HttpClientModule } from '@angular/common/http';
//WebScocketSubject
//Forms
import { FormsModule } from '@angular/forms';
//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; 
//Flex layout
import { FlexLayoutModule } from '@angular/flex-layout';
//Routes
import { AppRoutingModule } from './app-routing.module';
//Main component
import { AppComponent } from './app.component';
//Custome services
import { DispServices } from './dispositivos/disp.service';
import { WebSocketServices } from './dispositivos/websocket.service';
//Custome components
import {EcDispComponent} from './dispositivos/ec-disp/ec-disp.component';
import {EcDetalleComponent} from './dispositivos/ec-detalle/ec-detalle.component';
import {EcIotComponent } from './dispositivos/ec-iot/ec-iot.component';


@NgModule({
  declarations: [
    AppComponent,
    EcDispComponent,
    EcDetalleComponent,
    EcIotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [DispServices,
              WebSocketServices],
  bootstrap: [AppComponent]
})
export class AppModule { }

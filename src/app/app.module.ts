import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpModule} from '@angular/http';
//import { SimpleNotificationsModule } from 'angular2-notifications';
import { routes } from './app.router'; 


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { PrincipalAlumnosComponent } from './principal-alumnos/principal-alumnos.component';
import { PrincipalMaestrosComponent } from './principal-maestros/principal-maestros.component';
import { PrincipalAdminComponent } from './principal-admin/principal-admin.component';
import { ForbiddenValidatorDirective } from './shared/forbidden-name.directive';
import { KardexComponent } from './kardex/kardex.component';
import { KadexAlumnoComponent } from './kadex-alumno/kadex-alumno.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    PrincipalAlumnosComponent,
    PrincipalMaestrosComponent,
    PrincipalAdminComponent,
    ForbiddenValidatorDirective,
    KardexComponent,
    KadexAlumnoComponent
  ], 
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
   /// SimpleNotificationsModule.forRoot(),
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-principal-maestros',
  templateUrl: './principal-maestros.component.html',
  styleUrls: ['./principal-maestros.component.css']
})
export class PrincipalMaestrosComponent implements OnInit {
usuario: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.validaUsuario();
  }

  cerrarSesion(){
    localStorage.removeItem("usuario");
    this.router.navigate(['home']);
  }

  validaUsuario(){
    this.usuario = JSON.parse ( localStorage.getItem("usuario") );
      if (this.usuario == null){
        this.router.navigate(['home']);
      }
  }

}

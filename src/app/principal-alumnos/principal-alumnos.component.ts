import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {  Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-principal-alumnos',
  templateUrl: './principal-alumnos.component.html',
  styleUrls: ['./principal-alumnos.component.css']
})
export class PrincipalAlumnosComponent implements OnInit {
 usuario: any;
  constructor(
    private modalService:NgbModal,
    private router: Router
  ) {  
  }

  ngOnInit() {
    this.validaUsuario();
  }
  cerrarSesion(){
    localStorage.removeItem("usuario");
    this.router.navigate(['home']);
  }
  
  public abrirmodal(modal){
    this.modalService.open(modal);
  }

  validaUsuario(){
    this.usuario = JSON.parse ( localStorage.getItem("usuario") );
      if (this.usuario == null){
        this.router.navigate(['home']);
      }
  }
}

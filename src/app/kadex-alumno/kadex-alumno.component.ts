import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {  Router, ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: 'app-kadex-alumno',
  templateUrl: './kadex-alumno.component.html',
  styleUrls: ['./kadex-alumno.component.css']
})
export class KadexAlumnoComponent implements OnInit {
  modalRef:any;
  usuario: any;
  alumnos:[{idAlumno:'',Nombre:'',Calificacion:'', Ciclo:''}];
  constructor(
    private modalService:NgbModal,
    private router: Router,
    public http: Http
  ) { }

  ngOnInit() {
    this.validaUsuario();
    this.ObtieneDatos(3);
  }

  public abrirmodal(modal){
    this.modalRef =  this.modalService.open(modal,{
      size: 'lg',
    });
  }
  cierraModal(){
    this.modalRef.dismiss();
  }

  cerrarSesion(){
    localStorage.removeItem("usuario");
    this.router.navigate(['home']);
  }

  Inicio(){
    this.router.navigate(['principalMaestros']);
  }

  ObtieneDatos(tynOp){
    var link = 'http://mauvalsa.com/ControlEscolar/MaestroObtieneDatos.php';
    var data = JSON.stringify({"opcion": tynOp, "idAlumno": this.usuario.id});
    this.http.post(link, data)
    .subscribe(respuesta => {
        let res=respuesta.json();
        console.log(res);
        if(res != null){
          if (tynOp == 3){
            this.alumnos = res;
          }
        }else{
          console.log(JSON.stringify(respuesta));
        }
    }, error => {
        console.log("Oooops!");
    });
}


  validaUsuario(){
    this.usuario = JSON.parse ( localStorage.getItem("usuario") );
      if (this.usuario == null){
        this.router.navigate(['home']);
      }else{
        if(this.usuario.tipo != 1){
          if(this.usuario.tipo == 2){
            this.router.navigate(['principalMaestros']);
          }else if(this.usuario.tipo == 3){
            this.router.navigate(['principalAdmin']);
          }
        }
      }
  }


}

import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {  Router, ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit { 
  modalRef:any;
  usuario: any;
  idMateria:any;
  Alumnos:any;
  NuevaCalificacion={idAlumno:'',Calificacion:''};
  alumnos:[{idAlumno:'',Nombre:'',Calificacion:''}];

  constructor(
    private modalService:NgbModal,
    private router: Router,
    public http: Http
  ) {}

  ngOnInit() {
    this.validaUsuario();
    this.ObtieneDatos(1);
  }

  public abrirmodal(modal){
    this.modalRef =  this.modalService.open(modal,{
      size: 'lg',
    });
  }
  cierraModal(){
    this.modalRef.dismiss();
  }

  SetidAlumno(idAlumno){
    this.NuevaCalificacion = {idAlumno: idAlumno, Calificacion:''};
  }

  GuardaCalificacion(calificacion){
    let idAlumno = this.NuevaCalificacion.idAlumno;
    this.NuevaCalificacion ={idAlumno: idAlumno,Calificacion: calificacion};
    this.ObtieneDatos(2);
  }

  cerrarSesion(){
    localStorage.removeItem("usuario");
    this.router.navigate(['home']);
  }

  ObtieneDatos(tynOp){
    var link = 'http://mauvalsa.com/ControlEscolar/MaestroObtieneDatos.php';
    if(tynOp == 1){
      var data = JSON.stringify({"opcion": tynOp, "idMateria": this.idMateria});
    }else{
      var data = JSON.stringify({"opcion": tynOp, "idMateria": this.idMateria, "idAlumno": this.NuevaCalificacion.idAlumno, "Calificacion": this.NuevaCalificacion.Calificacion  });
    }
    this.http.post(link, data)
    .subscribe(respuesta => {
        let res=respuesta.json();
        if(res != null){
          if (tynOp == 1){
            this.alumnos = res;
          }else{
            this.cierraModal();
            this.ObtieneDatos(1);
          }
        }else{
          console.log(JSON.stringify(respuesta));
        }
    }, error => {
        console.log("Oooops!");
    });
}

  Inicio(){
    this.router.navigate(['principalMaestros']);
  }


  validaUsuario(){
    this.usuario = JSON.parse ( localStorage.getItem("usuario") );
    this.idMateria = localStorage.getItem("idMateriaACalificar");
      if (this.usuario == null){
        this.router.navigate(['home']);
      }else{
        if(this.usuario.tipo != 2){
          if(this.usuario.tipo == 3){
            this.router.navigate(['principalAdmin']);
          }else if(this.usuario.tipo == 1){
            this.router.navigate(['principalAlumnos']);
          }
        }
      }
  }

}

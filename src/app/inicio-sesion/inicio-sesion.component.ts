import { Component, OnInit , Inject} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Http} from '@angular/http';
//import { NotificationsService} from 'angular2-notifications';
import {  Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  usuario:any;
  data:{usuario: any,contrasenia: any, nombre:any, correo:any, response:any};
  public optionsAlert = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true,
    pauseOnHover: true,
    clickToClose: true,
    animate: "scale"
}

  constructor(
    private modalService: NgbModal,
    public http: Http,
    //private _service: NotificationsService,
    public router: Router
  ) {
    this.http = http;
   }

  ngOnInit() {
    this.validaInicio()
  }


  validaInicio(){
      this.usuario = JSON.parse ( localStorage.getItem("usuario") );
      if (this.usuario != null){
        this.router.navigate([this.usuario.pagina]);
      }
      
  }

  iniciarSesion(usr,contra){
    var link = '//mauvalsa.com/ControlEscolar/ValidaUsr.php';
    var data = JSON.stringify({"codigo": usr, "contra": contra});
    this.http.post(link, data)
        .subscribe(respuesta => {
            let res=respuesta.json();
            if(res.success){
              if(res.alumno){
                this.usuario = {
                    id: res.id,
                    nombre: res.nombre,
                    carrera: res.carrera,
                    pagina: 'principalAlumnos'
                };
                localStorage.setItem("usuario", JSON.stringify(this.usuario));
                this.router.navigate(['principalAlumnos']);
              }else{
                if(res.maestro){
                  this.usuario = {
                    id: res.id,
                    nombre: res.nombre,
                    carrera: res.carrera,
                    pagina: 'principalMaestros'
                  };
                  localStorage.setItem("usuario", JSON.stringify(this.usuario));
                  this.router.navigate(['principalMaestros']);
                }else{
                  this.usuario = {
                    id: res.id,
                    nombre: res.nombre,
                    nivel: res.nivel,
                    pagina: 'principalAdmin'
                };
                localStorage.setItem("usuario", JSON.stringify(this.usuario));
                  this.router.navigate(['principalAdmin']);
                }
                
              }
                //this.router.navigate(['principal']);
            }else{
              console.log(JSON.stringify(respuesta));
              //this._service.error(
                //'Error',
                //'Codigo y/o contraseña erroneos',this.optionsAlert
            //)
            }
        }, error => {
            console.log("Oooops!");
        });
  }
}

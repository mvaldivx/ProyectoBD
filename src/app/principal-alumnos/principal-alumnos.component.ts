import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {  Router, ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: 'app-principal-alumnos',
  templateUrl: './principal-alumnos.component.html',
  styleUrls: ['./principal-alumnos.component.css']
})
export class PrincipalAlumnosComponent implements OnInit {
  modalRef:any;
  materias: any[];
  usuario: any;
  tdStyle= [];
  tdStyleHorario =[];
  tdMateria=[];
  tdMateriaHorario =[];
  MateriaCorrelacion= [];
  nombreAula=[];
  nombreMateria=[];
  MateriaCorrelacionHorario=[];
  Materia= {idMateria: 0, nombreMateria: '', nombreMaestro: '', aula:''};
  materiasHorario=[];
  colisiona = false;

  constructor(
    private modalService:NgbModal,
    private router: Router,
    public http: Http
  ) { 
    this.http = http; 
  }

  ngOnInit() {
    this.validaUsuario();
    this.generaStyleTd(2);
    this.obtieneDatos(4);
  }
  cerrarSesion(){
    localStorage.removeItem("usuario");
    this.router.navigate(['home']);
  }
  
  public abrirmodal(modal){
    this.modalRef =  this.modalService.open(modal,{
      size: 'lg',
    });
  }
  cierraModal(){
    this.modalRef.dismiss();
  }

  validaUsuario(){
    this.usuario = JSON.parse ( localStorage.getItem("usuario") );
      if (this.usuario == null){
        this.router.navigate(['home']);
      }
  }

  generaStyleTd(opc){
    let i = 0;
    let UltimaPos = 0;
    for ( i = 0; i <= 34; i ++){
      if (opc == 1){
        this.tdStyle[i]='deactivetd';
        this.tdMateria[i] = {"fila":0,"columna":0};
      }else{
        this.tdStyleHorario[i] = 'deactivetd';
        this.tdMateriaHorario[i] = {"fila":0,"columna":0};
        this.nombreAula[i] = "";
        this.nombreMateria[i]="";
      }
    }
    if(opc ==1){
      this.generaArrayMat(1);
    }else{
      this.generaArrayMat(2);
    }
  }

  generaArrayMat(opc){
    let o = 0;
    let a = 0;
    let Pos =0;
    for(o=0; o < 7; o++){
      a=0;
      for(a = 0; a < 5; a++ ){
        if( opc == 1){
          this.MateriaCorrelacion[Pos]= {"fila": o +1, "columna": a+1};
        }else{
          this.MateriaCorrelacionHorario[Pos]= {"fila": o +1, "columna": a+1};
        }
        Pos = Pos +1;
      }
    }
  }

  pintaClase(){

  }

  obtieneDatos(tynOp){
    var link = 'http://mauvalsa.com/ControlEscolar/AlumnoObtieneDatos.php';
    if (tynOp == 2 || tynOp == 3 ){
      var data = JSON.stringify({"opcion": tynOp, "idMateria": this.Materia.idMateria});
    }else if(tynOp == 1){
      this.materiasHorario = [];
      var data = JSON.stringify({"opcion": tynOp});
    } else if (tynOp == 4){
      var data = JSON.stringify({"opcion": tynOp, "idAlumno": this.usuario.id});
    }
    this.http.post(link, data)
        .subscribe(respuesta => {
            let res=respuesta.json();
            if(res != null){
              if (tynOp ==1){
                this.Materia= {idMateria: 0, nombreMateria: '', nombreMaestro: '', aula:''};
                this.materias = res;
              }else if(tynOp ==2){
                this.Materia = {idMateria: res[0].idMateria, nombreMateria: res[0].Nombre, nombreMaestro: res[0].Maestro, aula:res[0].Aula}
              }else if (tynOp == 3){
                let i = 0;
                let o = 0;
                for(o = 0; o < res.length; o++){
                  for ( i = 0; i < 34; i ++){
                    if(this.MateriaCorrelacion[i].fila == res[o].fila && this.MateriaCorrelacion[i].columna == res[o].columna){
                      this.tdMateria[i].fila = res[o].fila;
                      this.tdMateria[i].columna = res[o].columna;
                      this.tdStyle[i]="noDisp";
                    }
                  }
                }
              }else if (tynOp ==4){
                let i = 0;
                let o = 0;
                for(o = 0; o < res.length; o++){
                  for ( i = 0; i < 34; i ++){
                    if(this.MateriaCorrelacionHorario[i].fila == res[o].fila && this.MateriaCorrelacionHorario[i].columna == res[o].columna){
                      this.tdMateriaHorario[i].fila = res[o].fila;
                      this.tdMateriaHorario[i].columna = res[o].columna;
                      this.nombreAula[i]=res[o].Aula;
                      this.nombreMateria[i] = res[o].Materia;
                      this.tdStyleHorario[i]="noDisp";
                    }
                  }
                }
              }
                
            }else{
              console.log(JSON.stringify(respuesta));
            }
        }, error => {
            console.log("Oooops!");
        });
  }

  Registrar(tynOp){
    var link = 'http://mauvalsa.com/ControlEscolar/Registrar.php';
    var data = JSON.stringify({"tynOpc": tynOp, "idMateria": this.Materia.idMateria, "idAlumno": this.usuario.id});
    this.http.post(link, data)
        .subscribe(respuesta => {
            let res=respuesta.json();
            if (res.success){
              if (res.error){
                alert("Esta materia ya la tienes registrada");
              }else{
                this.modalRef.dismiss();
                this.generaStyleTd(2);
                this.obtieneDatos(4);
              }
              
            }
          }, error => {
            console.log("Oooops!");
        });
  }

  ValidaRegistroMateria(){
    this.colisiona = false;
    var link = 'http://mauvalsa.com/ControlEscolar/AlumnoObtieneDatos.php';
    var data = JSON.stringify({"opcion": 5, "idAlumno": this.usuario.id});
    this.http.post(link, data)
        .subscribe(respuesta => {
            let res=respuesta.json();
            this.materiasHorario = res;
            this.validaMateria();
          }, error => {
            console.log("Oooops!");
        });
        
  }
  validaMateria(){
    var link = 'http://mauvalsa.com/ControlEscolar/AlumnoObtieneDatos.php';
    if (this.materiasHorario.length >=1){
      let cont = 0;
        for(cont = 0; cont < this.materiasHorario.length; cont++){
          var data = JSON.stringify({"opcion": 6, "id1": this.materiasHorario[cont].idMateria, "id2":this.Materia.idMateria});
          this.http.post(link, data)
            .subscribe(respuesta => {
              let res=respuesta.json();
              if (res.colisiona){
                this.colisiona=true;
                if(cont == this.materiasHorario.length){
                  if(this.colisiona){
                    alert("La materia que intentas registrar tiene conflictos de horario con otra materia.");
                  }else{
                    this.Registrar(10);  
                  }
                }
              }
            }, error => {
            console.log("Oooops!");
          });
        }
    }else{
      this.Registrar(10);  
    }
    
    
  }

}

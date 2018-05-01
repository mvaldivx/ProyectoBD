import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Http} from '@angular/http';
import {  Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-principal-admin',
  templateUrl: './principal-admin.component.html',
  styleUrls: ['./principal-admin.component.css']
})
export class PrincipalAdminComponent implements OnInit {
  modalRef:any;
  materiaForm: FormGroup;

  codigoMateria = 0;
  codigoAlumno = 0;
  codigoAula = 0;
  codigoMaestro = 0;
  usuario:any;
  AulaMaestro:any[];
  Aulas: any[];
  Carreras: any[];
  tdStyle= [];
  tdMateria=[];
  MateriaCorrelacion=[];
  tablaHorarios="tablaDefault";
  Maestros: any[];
  Alumnos: any[];
  Materias: any[];
  MaestroData: any[];
  AlumnoData: any[];
  MateriaData: any[];
  ModificaMaestro= false;
  ModificaAlumno = false;
  ModificaMateria = false;
 

  Maestro = {codigo: this.codigoMaestro, nombre: '',curp: '',imss:'', domi:'', tel:'',depa:'' };
  Aula = {codigo: this.codigoAula};
  Alumno = {codigo: this.codigoAlumno, nombre:'', carrera:'', ciclo:'', tel:'', domi: '',curp:'',imss: ''};
  materia = {codigo : this.codigoAlumno,nombre: '',carrera:'', departamento: '',  creditos: '', turno: '', idMaestro:'', idAula:''};

  constructor(
    private modalService:NgbModal,
    public http: Http,
    public router: Router
  ) { 
    this.http = http;
  }

  ngOnInit(): void {
    this.validaUsuario();

    this.materiaForm = new FormGroup({
      'codigo': new FormControl(this.materia.codigo),
      'name': new FormControl(this.materia.nombre, [Validators.required]),
      'carrera': new FormControl(this.materia.carrera,[Validators.required]),
      'dep': new FormControl(this.materia.departamento, [Validators.required]),
      'creditos': new FormControl(this.materia.creditos, [Validators.required]),
      'turno': new FormControl(this.materia.turno)
    });
    this.MostrarInfo(9);
    this.MostrarInfo(10);
    this.MostrarInfo(11);
  }

  generaStyleTd(){
    let i = 0;
    let UltimaPos = 0;
    for ( i = 0; i < 78; i ++){
      this.tdStyle[i]='deactivetd';
      this.tdMateria[i] = {"fila":0,"columna":0};
    }
    
  }

  generaArrayMat(){
    let o = 0;
    let a = 0;
    let Pos =0;
    for(o=0; o < 13; o++){
      a=0;
      for(a = 0; a < 6; a++ ){
        this.MateriaCorrelacion[Pos]= {"fila": o +1, "columna": a+1};
        Pos = Pos +1;
      }
    }
    
  }

  validaUsuario(){
    this.usuario = JSON.parse ( localStorage.getItem("usuario") );
      if (this.usuario == null){
        this.router.navigate(['home']);
      }
  }

  cerrarSesion(){
    localStorage.removeItem("usuario");
    this.router.navigate(['home']);
  }

  public abrirmodal(modal){
    this.modalRef = this.modalService.open(modal,{
      size: 'lg',
    });
  }

  limpiaCampos(){
    this.materia.codigo = null;
    this.materia.nombre = null;
    this.materia.carrera = null;
    this.materia.creditos = null;
    this.materia.departamento = null;
      
  }
  



  get codigo() { return this.materiaForm.get('codigo'); }
  get name() { return this.materiaForm.get('nombre'); }
  get carrera() { return this.materiaForm.get('carrera'); }
  get departamento() { return this.materiaForm.get('departamento'); }
  get creditos() { return this.materiaForm.get('creditos'); }
  get turno() { return this.materiaForm.get('turno'); }

  obtieneId(tynOp){
      var link = 'http://mauvalsa.com/ControlEscolar/ObtieneDatos.php';
    var data = JSON.stringify({"opcion": tynOp});
    this.http.post(link, data)
        .subscribe(respuesta => {
            let res=respuesta.json();
            if(res.success){
              if (tynOp ==1){
                this.ModificaMateria = false;
                this.materia.codigo = res.response;
                this.generaStyleTd();
                this.generaArrayMat();
              }else if(tynOp == 2){
                this.ModificaAlumno = false;
                this.Alumno={codigo: 0, nombre:'', carrera:'', ciclo:'', tel:'', domi: '',curp:'',imss: ''};
                this.Alumno.codigo = res.response;
              }else if(tynOp == 3){
                this.ModificaMaestro = false;
                this.Maestro={codigo: 0, nombre: '',curp: '',imss:'', domi:'', tel:'',depa:'' };
                this.Maestro.codigo = res.response;
              }else if(tynOp == 4){
                this.Aula.codigo = res.response;
              }
                
            }else{
              if(tynOp == 5){
                this.AulaMaestro = respuesta.json();
              }else if(tynOp == 6){
                this.Aulas = respuesta.json();
              }else if(tynOp == 8){
                this.Carreras = respuesta.json();
              }else{
              console.log(JSON.stringify(respuesta));
              }
            }
        }, error => {
            console.log("Oooops!");
        });
    
  }

  ObtieneDatos(tynOp, id){
    var link = 'http://mauvalsa.com/ControlEscolar/ObtieneDatos.php';
    var data = JSON.stringify({"opcion": tynOp, "id":id});
    this.http.post(link, data)
        .subscribe(respuesta => {
          if(tynOp == 12){
            this.ModificaMaestro = true;
            this.MaestroData = respuesta.json();
            this.Maestro = {codigo : this.MaestroData[0].idMaestro, nombre:this.MaestroData[0].Nombre, curp: this.MaestroData[0].Curp,
                imss: this.MaestroData[0].IMSS, tel: this.MaestroData[0].Tel, depa: this.MaestroData[0].Departamento, domi: this.MaestroData[0].Domicilio};
          }else if(tynOp == 13){
            this.ModificaAlumno = true;
            this.AlumnoData = respuesta.json();
            this.Alumno ={codigo :this.AlumnoData[0].idAlumno, nombre: this.AlumnoData[0].Nombre,carrera: this.AlumnoData[0].Carrera,ciclo:this.AlumnoData[0].CicloIngreso, 
                          tel: this.AlumnoData[0].Telefono, domi: this.AlumnoData[0].Domicilio, curp: this.AlumnoData[0].Curp, imss: this.AlumnoData[0].IMSS};
          }else if(tynOp ==14){
            this.ModificaMateria =true;
            this.MateriaData = respuesta.json();
            this.materia = {codigo: this.MateriaData[0].idMateria,nombre: this.MateriaData[0].Nombre, carrera: this.MateriaData[0].Carrera, departamento: this.MateriaData[0].Departamento,
                            creditos: this.MateriaData[0].Creditos, turno: this.MateriaData[0].Turno, idMaestro: this.MateriaData[0].idMaestro, idAula: this.MateriaData[0].idAula};
            this.verificaDisp(this.MateriaData[0].idAula,  this.MateriaData[0].idMaestro);
            }
        }, error => {
          console.log("Oooops!");
        });
  }

  cierraModal(){
    this.modalRef.dismiss();
  }

  Registrar(tynOp,value1,value2,value3,value4,value5,value6,value7){
    var link = 'http://mauvalsa.com/ControlEscolar/Registrar.php';
    if (tynOp ==1 ){
      var data = JSON.stringify({"tynOpc": 1,"NumeroAula": value1,"Edificio": value2, "Capacidad": value3 });
    }else if(tynOp == 2){ 
      if(this.ModificaMaestro){
        var data = JSON.stringify({"tynOpc": 6,"Nombre": value1,"Telefono": value2, "Domicilio": value3, "IMSS": value4, "CURP": value5, "Departamento": value6 , "codigo": this.Maestro.codigo});
      }else{
        var data = JSON.stringify({"tynOpc": 2,"Nombre": value1,"Telefono": value2, "Domicilio": value3, "IMSS": value4, "CURP": value5, "Departamento": value6 , "codigo": this.Maestro.codigo});
      }
    }else if(tynOp == 5){ 
      if(this.ModificaAlumno){
        var data = JSON.stringify({"tynOpc": 7,"Nombre": value1,"Carrera": value2, "Ciclo": value3, "Tel": value4,"domi": value5, "IMSS":value6, "CURP": value7 , "codigo": this.Alumno.codigo});
      }else{
        var data = JSON.stringify({"tynOpc": 5,"Nombre": value1,"Carrera": value2, "Ciclo": value3, "Tel": value4,"domi": value5, "IMSS":value6, "CURP": value7 , "codigo": this.Alumno.codigo});
      }
    }
    
    this.http.post(link, data)
        .subscribe(respuesta => {
            let res=respuesta.json();
            if(res.success){
              this.modalRef.dismiss();
              this.materia = {codigo : this.codigoAlumno,nombre: '',carrera:'', departamento: '',  creditos: '', turno: '', idMaestro : '', idAula:''};
            }else{
              console.log(JSON.stringify(respuesta));
            }
        }, error => {
            console.log("Oooops!");
        });
  }

  verificaDisp(aula , maestro){
    this.generaStyleTd();
    this.generaArrayMat();
    if(aula != "" && maestro != ""){
      var link = 'http://mauvalsa.com/ControlEscolar/ObtieneDatos.php';
          var data = JSON.stringify({"opcion": 7,"idAula": aula,"idMaestro": maestro});
          this.http.post(link, data)
            .subscribe(respuesta => {
              let res=respuesta.json();
              this.generaStyleTd();
              let arreglo: any[];
              arreglo = res;
              let i = 0;
              let o = 0;
              for(o = 0; o < arreglo.length; o++){
                for ( i = 0; i < 78; i ++){
                  if(this.MateriaCorrelacion[i].fila == arreglo[o].fila && this.MateriaCorrelacion[i].columna == arreglo[o].columna){
                    this.tdMateria[i].fila = arreglo[o].fila;
                    this.tdMateria[i].columna = arreglo[o].columna;
                      this.tdStyle[i]="noDisp";
                  }
                }
              }
              }, error => {
                console.log("Oooops!");
            });
      this.tablaHorarios = "tablaVisible";
    }

  }

  tablaMateria(fila,columna,componente){
    if (this.tdStyle[componente] == 'deactivetd'){
      this.tdStyle[componente] = 'activetd';
      this.tdMateria[componente] = {"fila":fila,"columna":columna};
    }else if (this.tdStyle[componente] == 'activetd' || this.ModificaMateria){
      this.tdStyle[componente] = 'deactivetd';
      this.tdMateria[componente] = {"fila":0,"columna":0};
    }
  }

  guardaMateria( nombre, carrera, dep, creditos,turno,maestro,aula){
    if (this.ModificaMateria){
      var link = 'http://mauvalsa.com/ControlEscolar/Registrar.php';
      var data = JSON.stringify({"tynOpc": 9,"idMateria": this.materia.codigo};
      this.http.post(link, data)
      .subscribe(respuesta => {
        }, error => {
          console.log("Oooops!");
      });

    }
    let cont = 0;
    for( cont = 0; cont < 78; cont++){
      if(this.tdMateria[cont].fila != 0 && this.tdMateria[cont].columna != 0 ){
          var link = 'http://mauvalsa.com/ControlEscolar/Registrar.php';
          var data = JSON.stringify({"tynOpc": 4,"idMateria": this.materia.codigo,"fila":this.tdMateria[cont].fila,"columna": this.tdMateria[cont].columna, "maestro": maestro, "aula": aula});
    
          this.http.post(link, data)
            .subscribe(respuesta => {
              }, error => {
                console.log("Oooops!");
            });
      }
    }
    var link = 'http://mauvalsa.com/ControlEscolar/Registrar.php';
    if(this.ModificaMateria){
      var data = JSON.stringify({"tynOpc": 8,"idMateria": this.materia.codigo,"nombre": nombre, "carrera": carrera, "departamento": dep,
                                "creditos": creditos, "turno": turno, "maestro": maestro, "aula": aula });
    }else{
      var data = JSON.stringify({"tynOpc": 3,"idMateria": this.materia.codigo,"nombre": nombre, "carrera": carrera, "departamento": dep,
                                "creditos": creditos, "turno": turno, "maestro": maestro, "aula": aula });
    }
    
    this.http.post(link, data)
        .subscribe(respuesta => {
            let res=respuesta.json();
            if(res.success){
              this.materia = {codigo : this.codigoAlumno,nombre: '',carrera:'', departamento: '', creditos: '', turno: '', idMaestro:'', idAula:''};
              this.modalRef.dismiss();
            }else{
              console.log(JSON.stringify(respuesta));
            }
        }, error => {
            console.log("Oooops!");
        });
  }

  MostrarInfo(tynOp){
    var link = 'http://mauvalsa.com/ControlEscolar/ObtieneDatos.php';
    var data = JSON.stringify({"opcion": tynOp});
    this.http.post(link, data)
      .subscribe(respuesta => {
        if(tynOp == 9){
          this.Maestros = respuesta.json();
        }else if(tynOp == 10){
          this.Alumnos = respuesta.json();
        }else if(tynOp == 11){
          this.Materias = respuesta.json();
        }
        }, error => {
          console.log("Oooops!");
      });
  }

}

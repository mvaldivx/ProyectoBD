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

  materiaForm: FormGroup;
  codigoDB:any;
  usuario:any;
  materia = {codigo : this.codigoDB,nombre: '',carrera:'', departamento: '', horas: '', creditos: '', turno: '', LI:'',LF:'',MI:'',MF:'',MiI:'',MiF:'',JI:'',JF:'',VI:'',VF:'',SI:'',SF:''};

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
      'horas': new FormControl(this.materia.horas, Validators.required),
      'creditos': new FormControl(this.materia.creditos, [Validators.required]),
      'turno': new FormControl(this.materia.turno),
      'LI': new FormControl(this.materia.LI),
      'LF': new FormControl(this.materia.LF),
      'MI': new FormControl(this.materia.MI),
      'MF': new FormControl(this.materia.MF),
      'MiI': new FormControl(this.materia.MiI),
      'MiF': new FormControl(this.materia.MiF),
      'JI': new FormControl(this.materia.JI),
      'JF': new FormControl(this.materia.JF),
      'VI': new FormControl(this.materia.VI),
      'VF': new FormControl(this.materia.VF),
      'SI': new FormControl(this.materia.SI),
      'SF': new FormControl(this.materia.SF),
    });
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
    this.modalService.open(modal,{
      size: 'lg',
    });
  }

  limpiaCampos(){
    this.materia.codigo = null;
    this.materia.nombre = null;
    this.materia.carrera = null;
    this.materia.creditos = null;
    this.materia.departamento = null;
    this.materia.horas = null;
    this.materia.JF = null;
    this.materia.JI = null;
    this.materia.LF = null;
    this.materia.LI = null;
    this.materia.MF = null;
    this.materia.MI = null;
    this.materia.MiF = null;
    this.materia.MiI = null;
    this.materia.VF = null;
    this.materia.VI = null;
    this.materia.SF = null;
    this.materia.SI = null;
      
  }



  get codigo() { return this.materiaForm.get('codigo'); }
  get name() { return this.materiaForm.get('nombre'); }
  get carrera() { return this.materiaForm.get('carrera'); }
  get departamento() { return this.materiaForm.get('departamento'); }
  get horas() { return this.materiaForm.get('horas'); }
  get creditos() { return this.materiaForm.get('creditos'); }
  get turno() { return this.materiaForm.get('turno'); }
  get LI() { return this.materiaForm.get('LI'); }
  get LF() { return this.materiaForm.get('LF'); }
  get MI() { return this.materiaForm.get('MI'); }
  get MF() { return this.materiaForm.get('MF'); }
  get MiI() { return this.materiaForm.get('MiI'); }
  get MiF() { return this.materiaForm.get('MiF'); }
  get JI() { return this.materiaForm.get('JI'); }
  get JF() { return this.materiaForm.get('JF'); }
  get VI() { return this.materiaForm.get('VI'); }
  get VF() { return this.materiaForm.get('VF'); }
  get SI() { return this.materiaForm.get('SI'); }
  get SF() { return this.materiaForm.get('SF'); }

  obtieneIdMateria(){
      var link = 'http://mauvalsa.com/ControlEscolar/ObtieneDatos.php';
    var data = JSON.stringify({"opcion": 1});
    this.http.post(link, data)
        .subscribe(respuesta => {
            let res=respuesta.json();
            if(res.success){
                this.codigoDB = res.response;
            }else{
              console.log(JSON.stringify(respuesta));
            }
        }, error => {
            console.log("Oooops!");
        });
    
  }

}

import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: 'app-principal-maestros',
  templateUrl: './principal-maestros.component.html',
  styleUrls: ['./principal-maestros.component.css']
})
export class PrincipalMaestrosComponent implements OnInit {
usuario: any;
tdStyle= [];
tdMateria=[];
nombreAula=[];
nombreMateria=[];
MateriaCorrelacion=[];
materiaFicha= [{idMateria:0, Materia:''}];
totalFichaPago=0;


  constructor(
    private router: Router,
    public http: Http
  ) { }

  ngOnInit() {
    this.validaUsuario();
    this.generaStyleTd();
    this.obtieneDatos(8);
    this.obtieneDatos(9);
  }

  cerrarSesion(){
    localStorage.removeItem("usuario");
    this.router.navigate(['home']);
  }

  generaStyleTd(){
    let i = 0;
    let UltimaPos = 0;
    for ( i = 0; i <= 34; i ++){
        this.tdStyle[i]='deactivetd';
        this.tdMateria[i] = {"fila":0,"columna":0};
    }
      this.generaArrayMat();
    
  }

  generaArrayMat(){
    let o = 0;
    let a = 0;
    let Pos =0;
    for(o=0; o < 7; o++){
      a=0;
      for(a = 0; a < 5; a++ ){
        this.MateriaCorrelacion[Pos]= {"fila": o +1, "columna": a+1};
        Pos = Pos +1;
      }
    }
  }

  obtieneDatos(tynOp){
    var link = 'http://mauvalsa.com/ControlEscolar/AlumnoObtieneDatos.php';
    if (tynOp == 8 || tynOp == 9){
      var data = JSON.stringify({"opcion": tynOp, "idMaestro": this.usuario.id});
    }
    this.http.post(link, data)
        .subscribe(respuesta => {
            let res=respuesta.json();
            if(res != null){
              if (tynOp == 8){
                let i = 0;
                let o = 0;
                for(o = 0; o < res.length; o++){
                  for ( i = 0; i < 34; i ++){
                    if(this.MateriaCorrelacion[i].fila == res[o].fila && this.MateriaCorrelacion[i].columna == res[o].columna){
                      this.tdMateria[i].fila = res[o].fila;
                      this.tdMateria[i].columna = res[o].columna;
                      this.nombreAula[i]=res[o].Aula;
                      this.nombreMateria[i] = res[o].Materia;
                      this.tdStyle[i]="noDisp";
                    }
                  }
                }
              }else if(tynOp == 9){
                this.materiaFicha = res;
                this.totalFichaPago = this.materiaFicha.length * 25;
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

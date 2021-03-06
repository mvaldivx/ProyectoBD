import { ModuleWithProviders } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PrincipalAlumnosComponent } from './principal-alumnos/principal-alumnos.component';
import { PrincipalMaestrosComponent } from './principal-maestros/principal-maestros.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { PrincipalAdminComponent } from './principal-admin/principal-admin.component';
import { KardexComponent } from './kardex/kardex.component';
import { KadexAlumnoComponent } from './kadex-alumno/kadex-alumno.component';


export const router: Routes = [
 { path: 'home', component: InicioSesionComponent },
 { path: 'principalAlumnos', component:  PrincipalAlumnosComponent},
 { path: 'principalMaestros', component:  PrincipalMaestrosComponent},
 { path: 'principalAdmin', component:  PrincipalAdminComponent},
 { path: 'kardex', component:  KardexComponent},
 { path: 'kadex-alumnos', component:  KadexAlumnoComponent},
 { path: '', pathMatch: 'full', redirectTo: 'home'}
];

export const routes: ModuleWithProviders =  RouterModule.forRoot(router);
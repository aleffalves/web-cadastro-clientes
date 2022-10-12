import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesCadastroComponent } from './component/clientes-cadastro/clientes-cadastro/clientes-cadastro.component';
import { ClientesComponent } from './component/clientes/clientes.component';

const routes: Routes = [
  {path:'', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClientesComponent},
  {path: 'cliente-cadastro', component: ClientesCadastroComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

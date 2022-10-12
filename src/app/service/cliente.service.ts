import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlApi : string = environment.apiURLBase + '/cliente'

  constructor(
    private http : HttpClient
  ) { }

  buscarTodosClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlApi + '/todos')
  }

  cadastrar(cliente: Cliente):Observable<any>{
    return this.http.post(this.urlApi, cliente)
  }

  excluirCliente(idCliente: number):Observable<any>{
    return this.http.delete(this.urlApi + '/excluir/' + idCliente)
  }

  atualizarCliente(cliente: Cliente, idCliente : number):Observable<Cliente>{
    return this.http.put<Cliente>(this.urlApi + '/atualizar/' + idCliente, cliente)
  }

}

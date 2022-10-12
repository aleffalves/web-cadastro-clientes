import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Telefone } from '../model/telefone.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteCadastrOService {

  urlApi : string = environment.apiURLBase + '/cliente-telefone'

  constructor(
    private http : HttpClient
  ) { }

  deletarTelefone(idTelefone : number):Observable<any>{
    return this.http.delete<any>(this.urlApi + '/'+ idTelefone)
  }

  atualizarTelefone(telefone: Telefone[], idCliente: number):Observable<Telefone[]>{
    return this.http.put<Telefone[]>(this.urlApi + '/atualizar/'+ idCliente, telefone)
  }

}

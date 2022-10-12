import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/service/cliente.service';
import { MsgService } from 'src/app/service/msg.service';
import { ModalConfirmacaoComponent } from '../modais/modal-confirmacao/modal-confirmacao.component';
import { ModalDetalhesComponent } from '../modais/modal-detalhes/modal-detalhes.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'cpf', 'ativo'];
  clientes: Cliente[] = new Array;
  clientesOrig: Cliente[] = new Array;
  filtro: string = ''
  filterAtivo: boolean = false;

  constructor(
    private router : Router,
    private clienteService: ClienteService,
    private dialog : MatDialog,
    private msgService : MsgService
  ) { }

  ngOnInit(): void {
    this.buscarClientes();
  }

  buscarClientes(){
    this.clienteService.buscarTodosClientes().subscribe({
      next: (v) => {
        this.clientes = v
        this.clientesOrig = v
      },
      error: (e) => this.msgService.msgErro(e.error.message),
      complete: () => console.info('complete') 
    })
  }

  adicionarCliente(){
    this.router.navigate(['cliente-cadastro'])
  }

  deletarCliente(idCliente : number){
    let modal = this.dialog.open(ModalConfirmacaoComponent,{})
    modal.afterClosed().subscribe(
      resposta => {
        if(resposta){
          this.clienteService.excluirCliente(idCliente).subscribe({
            next: (v) => {
              this.msgService.msgSucesso('Cliente excluído com Sucesso!')
              this.buscarClientes()
            },
            error: (e) => this.msgService.msgErro(e.error.message),
            complete: () => console.info('complete') 
          }
          )
        }
      }
    )
  }

  openDetalhes(cliente: Cliente){
    let modal = this.dialog.open(ModalDetalhesComponent,{
      data:{
        cliente: cliente
      }
    })
  }

  filterAtivos(){
    this.filterAtivo = !this.filterAtivo
    if(this.filterAtivo){
      this.clientes = this.clientes.filter(a => a.ativo == true)
    }else{
      this.clientes = this.clientesOrig
    }
  }

}

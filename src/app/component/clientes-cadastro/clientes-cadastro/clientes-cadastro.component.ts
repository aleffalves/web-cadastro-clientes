import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TipoPessoa } from 'src/app/enums/tipo.enum';
import { Cliente } from 'src/app/model/cliente.model';
import { Telefone } from 'src/app/model/telefone.model';
import { ClienteCadastrOService } from 'src/app/service/cliente-cadastr-o.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { MsgService } from 'src/app/service/msg.service';
import { ModalConfirmacaoComponent } from '../../modais/modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-clientes-cadastro',
  templateUrl: './clientes-cadastro.component.html',
  styleUrls: ['./clientes-cadastro.component.css']
})
export class ClientesCadastroComponent implements OnInit {
  readonly FISICA = TipoPessoa.FISICA
  readonly JURIDICA = TipoPessoa.JURIDICA

  @Input() cliente : Cliente = new Cliente();
  @Input() telefones : Telefone[] = new Array;
  @Output() close : EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router,
    private clienteService : ClienteService,
    private clienteCadastroService : ClienteCadastrOService,
    private msgService : MsgService,
    private dialog : MatDialog
    ) { }

  ngOnInit(): void {
  }

  salvar(){
    if(this.cliente.id){
      return this.atualizar();
    }
    if(!this.validarSePodeSalvar())return
    this.cliente.telefones = this.telefones
    this.cliente.dataCadastro = new Date()
    this.clienteService.cadastrar(this.cliente).subscribe({
      next: (v) => {
        this.msgService.msgSucesso('Cliente cadastrado com Sucesso!')
        this.router.navigate(['clientes'])
      },
      error: (e) => this.msgService.msgErro(e.error.message),
      complete: () => console.info('complete') 
    })
  }

  addTelefone(){
    let telefone: Telefone = new Telefone();
    this.telefones.push(telefone)
  }

  cancelar(){
    if(this.cliente.id){
      return this.close.emit()
    }
    this.cliente = new Cliente();
    this.telefones = new Array
  }

  validarSePodeSalvar(): boolean{
    if(!this.cliente.nome || this.cliente.nome.length < 5){
      this.msgService.msgAdvertencia('Defina um nome válido para o cliente!')
      return false
    }
    if(!this.cliente.tipo){
      this.msgService.msgAdvertencia('Defina o tipo Pessoa!')
      return false
    }

    if(this.cliente.tipo == this.FISICA){
      if(this.cliente.cpfCnpj?.length != 11){
        this.msgService.msgAdvertencia("Digite um CPF valido!")
        return false
      }
    }

    if(this.cliente.tipo == this.JURIDICA){
      if(this.cliente.cpfCnpj?.length != 14){
        this.msgService.msgAdvertencia("Digite um CNPJ valido!")
        return false
      }
    }

    if(this.cliente.tipo == this.FISICA){
      if(this.cliente.rg?.length != 8){
        this.msgService.msgAdvertencia("Digite um RG valido!")
        return false
      }
    }

    if(this.cliente.tipo == this.JURIDICA){
      if(this.cliente.rg?.length != 12){
        this.msgService.msgAdvertencia("Digite uma IE valido!")
        return false
      }
    }

    if(this.cliente.ativo == undefined || this.cliente.ativo == null){
       this.msgService.msgAdvertencia("Defina se o cliente está Ativo!")
       return false
    }

    return true;
  }

  removerTelefone(telefoneId: number){
    let modal = this.dialog.open(ModalConfirmacaoComponent,{})
    modal.afterClosed().subscribe(
      resposta => {
        if(resposta){
          this.clienteCadastroService.deletarTelefone(telefoneId).subscribe({
            next: (v) => {
              this.msgService.msgSucesso("Telefone excluido com sucesso!")
              this.close.emit();
            },
            error: (e) => this.msgService.msgErro(e.error.message)
          }
          )
        }
      }
    )
  }

  atualizar(){
    if(!this.validarSePodeSalvar())return
    this.clienteCadastroService.atualizarTelefone(this.telefones, this.cliente.id).subscribe({
      error: (e) => this.msgService.msgErro(e.error.message),
      complete: () => this.atualizarCliente()
    })
  }

  atualizarCliente(){
    this.clienteService.atualizarCliente(this.cliente, this.cliente.id).subscribe({
      next: (v) => {
        this.msgService.msgSucesso("Cliente atualizado com sucesso!")
        this.close.emit();
      },
      error: (e) => this.msgService.msgErro(e.error.message)
  })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoPessoa } from 'src/app/enums/tipo.enum';
import { Cliente } from 'src/app/model/cliente.model';
import { Telefone } from 'src/app/model/telefone.model';
import { ClienteService } from 'src/app/service/cliente.service';
import { MsgService } from 'src/app/service/msg.service';

@Component({
  selector: 'app-clientes-cadastro',
  templateUrl: './clientes-cadastro.component.html',
  styleUrls: ['./clientes-cadastro.component.css']
})
export class ClientesCadastroComponent implements OnInit {
  readonly FISICA = TipoPessoa.FISICA
  readonly JURIDICA = TipoPessoa.JURIDICA

  cliente : Cliente = new Cliente();
  telefones : Telefone[] = new Array;

  constructor(
    private router: Router,
    private clienteService : ClienteService,
    private msgService : MsgService
    ) { }

  ngOnInit(): void {
  }

  salvar(){
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
    this.cliente = new Cliente();
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

    if(!this.cliente.ativo){
       this.msgService.msgAdvertencia("Defina se o cliente está Ativo!")
       return false
    }

    return true;
  }

}

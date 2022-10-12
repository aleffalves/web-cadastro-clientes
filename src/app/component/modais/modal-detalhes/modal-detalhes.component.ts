import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/model/cliente.model';

@Component({
  selector: 'app-modal-detalhes',
  templateUrl: './modal-detalhes.component.html',
  styleUrls: ['./modal-detalhes.component.css']
})
export class ModalDetalhesComponent implements OnInit {

  cliente !: Cliente;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.cliente = this.data.cliente
    console.log(this.cliente)
  }

}

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MsgService {

  constructor(public toastr: ToastrService) { }

  msgSucesso(msg: string) {
    this.toastr.success(msg,'Sucesso');
  }

  msgErro(msg: string) {
    this.toastr.error(msg,'Erro');
  }

  msgAdvertencia(msg: string) {
    this.toastr.warning(msg,'Notificação');
  }

}


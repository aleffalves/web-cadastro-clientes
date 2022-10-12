import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientesComponent } from './component/clientes/clientes.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from './component/modais/modal-confirmacao/modal-confirmacao.component';
import { MsgService } from './service/msg.service';
import { ToastrModule } from 'ngx-toastr';
import { ModalDetalhesComponent } from './component/modais/modal-detalhes/modal-detalhes.component';
import {MatListModule} from '@angular/material/list';
import { CpfCnpjPipe } from './utils/cpf-cnpj.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EdicaoClientesComponent } from './component/edicao-clientes/edicao-clientes/edicao-clientes.component';
import { ClientesCadastroComponent } from './component/clientes-cadastro/clientes-cadastro/clientes-cadastro.component';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ModalConfirmacaoComponent,
    ModalDetalhesComponent,
    CpfCnpjPipe,
    EdicaoClientesComponent,
    ClientesCadastroComponent
  ],
  entryComponents:[
    ModalConfirmacaoComponent,
    ModalDetalhesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatRadioModule,
    NgxMaskModule.forRoot(), 
    ToastrModule.forRoot(),
    HttpClientModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule ,
    Ng2SearchPipeModule
  ],
  providers: [
    MsgService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

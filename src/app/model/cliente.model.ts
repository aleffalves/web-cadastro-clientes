import { TipoPessoa } from "../enums/tipo.enum"
import { Telefone } from "./telefone.model"

export class Cliente{
    id!: number
    nome?: string
    tipo?: TipoPessoa
    cpfCnpj?: string
    rg?: string
    dataCadastro?: Date
    ativo?: boolean
    telefones: Telefone[] = new Array
}
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'cpfCnpj'
  })
  export class CpfCnpjPipe implements PipeTransform {
  
    transform(cpfCnpj: any, ...args: any[]): any {
      
      if (!cpfCnpj || typeof cpfCnpj !== 'string') {
        return cpfCnpj;
      }
      
      cpfCnpj = cpfCnpj.replace(".", "").replace("-", "").replace("/", "").replace(" ", "");
  
      if (cpfCnpj.length < 14) {
        return [cpfCnpj.slice(0, 3), ".", cpfCnpj.slice(3, 6), ".", cpfCnpj.slice(6, 9), "-", cpfCnpj.slice(9)].join('');
      }
  
      return [cpfCnpj.slice(0, 2), ".", cpfCnpj.slice(2, 5), ".", cpfCnpj.slice(5, 8), "/", cpfCnpj.slice(8, 12) + '-' + cpfCnpj.slice(12, 14)].join('');
    }
  
  }
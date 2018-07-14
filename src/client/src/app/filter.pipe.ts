import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(users: any, term: any): any {
    //Verificando si el termino es undefined
    if(term === undefined) return users;

    // returnamos el array de usuarios actualizados
    return users.filter(function(user) {
      return user.firstName.toLowerCase().includes(term.toLowerCase())
    })
  }

}

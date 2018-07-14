import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})

export class LimitPipe implements PipeTransform{
  transform(product: any){
    let productMdf = product.substring(0,120)
    return productMdf += '...'
  }
}
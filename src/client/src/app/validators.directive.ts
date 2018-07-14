import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

function verifySpaces(c: AbstractControl){
  if(c.value == null) return null;
  if(c.value.indexOf(' ') >= 0){
    return {sinEspacios: true}
  }return null;
}

@Directive({
  selector: '[sin-espacios]',
  providers: [
    {provide: NG_VALIDATORS, multi: true, useValue: verifySpaces}
  ]
})

export class SinEspacios {}
import { PipeTransform, Pipe } from '@angular/core';


@Pipe({name: 'valueFilter'})
export class ValueFilterPipe implements PipeTransform {

  options: Object[] = [];  
  transform(value, typename:string) : any {

		console.log("debug KeyPipe value = " + value);
		
		if (!value) {
      return value;
    } 

    return value;
  } 
  

} 
import { Component } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { Router } from '@angular/router';


@Component({
	template:
		`<div class="clearfix"></div><router-outlet></router-outlet>`,
  	inputs:[],
  	outputs:[]
})

export class PageContainerComponent{ 
	
	constructor() {		
	}

}

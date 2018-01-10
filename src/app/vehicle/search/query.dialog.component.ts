import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
    selector: 'vehicle-search-query',
    templateUrl: './query.dialog.html',
    styleUrls: ['./search.component.less']
})
export class QueryDialogComponent implements OnInit {
      
    constructor(private http: _HttpClient) {}

    ngOnInit() {
        
    }

    
}

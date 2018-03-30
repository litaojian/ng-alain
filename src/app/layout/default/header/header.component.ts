import { Component, ViewChild } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { HeaderService } from './header.service';
import { FileUploader } from 'ng2-file-upload';
import { NzMessageService } from 'ng-zorro-antd';
import { DomSanitizer } from '@angular/platform-browser' 
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers:[HeaderService]
})
export class HeaderComponent {
    searchToggleStatus: boolean;

    constructor(public settings: SettingsService) { }

    toggleCollapsedSidebar() {
        this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
    }
    showImgModal(){
        this.showImg=true;
    }
    handleCancel(){
        this.showImg=false;
    }
    searchToggleChange() {
        this.searchToggleStatus = !this.searchToggleStatus;
    }

}

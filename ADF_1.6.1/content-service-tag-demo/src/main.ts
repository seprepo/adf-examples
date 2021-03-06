/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule, Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CoreModule, AlfrescoSettingsService, AlfrescoAuthenticationService, StorageService, LogService } from 'ng2-alfresco-core';
import { TagModule } from 'ng2-alfresco-tag';

@Component({
    selector: 'alfresco-app-demo',
    template: `
                <label for="nodeId"><b>Insert Node Id</b></label><br>
                <input id="nodeId" type="text" size="48"  [(ngModel)]="nodeId"><br>
        <div class="container" *ngIf="authenticated">
            <div class="mdl-grid">
              <div class="mdl-cell mdl-cell--4-col"><alfresco-tag-node-actions-list [nodeId]="nodeId"></alfresco-tag-node-actions-list></div>
              <div class="mdl-cell mdl-cell--4-col">List Tags ECM <alfresco-tag-list></alfresco-tag-list></div>
              <div class="mdl-cell mdl-cell--4-col">
                    Tag list By Node ID
                    <alfresco-tag-node-list [nodeId]="nodeId"></alfresco-tag-node-list>
              </div>
            </div>
        </div>
    `
})
class TagDemo implements OnInit {

    @Input()
    nodeId: string = '74cd8a96-8a21-47e5-9b3b-a1b3e296787d';

    authenticated: boolean;

    constructor(private authService: AlfrescoAuthenticationService,
                private settingsService: AlfrescoSettingsService,
                private storage: StorageService,
                private logService: LogService) {
    }

    ngOnInit() {
        this.login();
    }

    login() {
        this.authService.login('admin', 'admin').subscribe(
            ticket => {
                this.logService.info(ticket);
                this.authenticated = true;
            },
            error => {
                this.logService.error(error);
                this.authenticated = false;
            });
    }

    logData(data) {
        this.logService.info(data);
    }
}

@NgModule({
    imports: [
        BrowserModule,
        CoreModule.forRoot(),
        TagModule
    ],
    declarations: [ TagDemo ],
    bootstrap:    [ TagDemo ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

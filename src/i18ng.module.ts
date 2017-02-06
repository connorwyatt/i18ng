import {NgModule} from '@angular/core';
import {i18ngDirective} from './i18ng.directive';
import {i18ngPipe} from './i18ng.pipe';
import {i18ngService} from './i18ng.service';

@NgModule({declarations: [i18ngDirective, i18ngPipe], providers: [i18ngService]})
export class i18ngModule {
  static initialize() {
    return {ngModule: i18ngModule};
  }
}

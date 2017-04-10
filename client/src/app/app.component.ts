import { Component, ElementRef } from '@angular/core';

declare var $: any

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styles: [
    '.container { cursor: default; }',
    '.container-fluid { cursor: default; }',
    '.no-bottom-margin { margin-bottom: 0px; }',
    // '.navbar-inverse { background-color: #007ACC; border-color:#007ACC }',
    // '.navbar-default .navbar-brand { color: #fff; }'
  ]
})
export class AppComponent {

  constructor(private el: ElementRef) { }

  menuClick(event: any, panel: any) {
    let stopPagination: Boolean = false;

    if ($(this.el.nativeElement).find('#' + panel).hasClass('in')) {
      stopPagination = true;
    } 

    if (stopPagination) {
      event.stopPropagation();
    }
  }
}


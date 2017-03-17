import { Component } from '@angular/core';


@Component({
  selector: 'my-app',
  template: `

    <ul class="nav nav-tabs">
      <li class="active"><a data-toggle="tab" href="#list-builder">List Builder</a></li>
      <li><a data-toggle="tab" href="#army-entry">Army Entry</a></li>
    </ul>

    <div class="tab-content">
      <div id="list-builder" class="tab-pane fade in active">      
        <h3>List Builder</h3>
        <div class="container">
          <div class="col-md-6"><army-selector (addUnitEvent)="armylist.addUnitToList($event)"></army-selector></div>
          <div class="col-md-6"><army-list #armylist (printListEvent)="listprinter.outputList($event)"></army-list></div>
          <list-printer #listprinter></list-printer>
        </div>
      </div>
      <div id="army-entry" class="tab-pane fade">      
        <h3>Army Entry</h3>
        <div class="col-md-12 container"><army-entry></army-entry></div>
      </div>
    </div>
     

  `,
  styles: [
    '.container { cursor: default; }'
  ]
})
export class AppComponent {


}

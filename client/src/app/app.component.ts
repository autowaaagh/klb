import { Component } from '@angular/core';


@Component({
  selector: 'my-app',
  template: `

    <ul class="nav nav-tabs">
      <li class="active"><a data-toggle="tab" href="#list-builder">List Builder</a></li>
      <li><a data-toggle="tab" href="#army-entry">Army Entry</a></li>
      <li><a data-toggle="tab" href="#special-rules-editor">Special Rules Entry</a></li>
      <li><a data-toggle="tab" href="#artefact-editor">Artefact Entry</a></li>
    </ul>

    <div class="tab-content">
      <div id="list-builder" class="tab-pane fade in active">      
        <h3>List Builder</h3>
        <div class="container-fluid">
          <div class="col-md-6"><army-selector (addUnitEvent)="armylist.addUnitToList($event)"></army-selector></div>
          <div class="col-md-6"><army-list #armylist (printListEvent)="listprinter.outputList($event)"></army-list></div>
          <list-printer #listprinter></list-printer>
        </div>
      </div>
      <div id="army-entry" class="tab-pane fade">      
        <h3>Army Entry</h3>
        <div class="container-fluid"><army-entry></army-entry></div>
      </div>
      <div id="special-rules-editor" class="tab-pane fade">      
        <h3>Special Rules Entry</h3>
        <div class="container-fluid"><special-rules-editor></special-rules-editor></div>
      </div>
      <div id="artefact-editor" class="tab-pane fade">      
        <h3>Artefact Entry</h3>
        <div class="container-fluid"><artefact-editor></artefact-editor></div>
      </div>
    </div>
     

  `,
  styles: [
    '.container { cursor: default; }',
    '.container-fluid { cursor: default; }'
  ]
})
export class AppComponent {


}


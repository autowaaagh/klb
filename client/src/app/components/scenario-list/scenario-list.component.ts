import { Component, OnInit } from '@angular/core';

import { Scenario } from '../../model';
import { FileLoaderService } from '../../services/file-loader.service';

@Component({
    moduleId: module.id,
    selector: 'scenario-list',
    templateUrl: 'scenario-list.component.html',
    styles:[
       `pre {
            white-space: pre-wrap;       /* css-3 */
            white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
            white-space: -pre-wrap;      /* Opera 4-6 */
            white-space: -o-pre-wrap;    /* Opera 7 */
            word-wrap: break-word;       /* Internet Explorer 5.5+ */
        }`
    ],
    providers: [FileLoaderService]
})

export class ScenarioListComponent implements OnInit {
    scenarios: Scenario[] = [];

    constructor(private fl: FileLoaderService) { 
        this.loadScenarios();
    }

    ngOnInit() { }

    loadScenarios() {
        this.fl.getScenarios((res => {
            let json = res.json();

            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                let s = this.loadScenario(obj);
                this.scenarios.push(s);
            }
        }));
    }

    loadScenario(json: JSON): Scenario {
        let s = new Scenario();
        s.name = json['name'];
        s.diceResult = json['diceResult'];
        s.description = json['description'];
        s.id = json['_id'];

        return s;
    }
}
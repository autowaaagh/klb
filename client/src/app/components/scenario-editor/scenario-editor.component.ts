import { Component, OnInit, DoCheck } from '@angular/core';

import { Scenario } from '../../model';
import { FileLoaderService } from '../../services/file-loader.service';

@Component({
    moduleId: module.id,
    selector: 'scenario-editor',
    templateUrl: 'scenario-editor.component.html',
    styles: [
        'textarea { margin-bottom: 10px; }'
    ],
    providers: [FileLoaderService]
})

export class ScenarioEditorComponent implements OnInit {
    scenarios: Scenario[] = [];

    constructor(private fl: FileLoaderService) {
        this.loadScenarios();
    }

    ngOnInit() { }

    findScenario(name: string, callback?: (s: Scenario, index: number) => void) {
        this.scenarios.forEach((n, i) => {
            if (n.name === name) {
                if (callback != undefined) {
                    callback(n, i);
                }
            }
        })
    }

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

    update(index: number) {
        let s = this.scenarios[index];
        this.fl.updateScenario(s.id, s);
    }

    add() {
        let s = new Scenario();
        s.name = "New Scenario";
        s.diceResult = 0;
        s.description = '';

        this.fl.createNewScenario(s, (res) => {
            let data = res.json();
            s.id = data._id;

            this.scenarios.push(s);
        })

    }

    remove(index: number) {
        let s = this.scenarios[index];
        this.fl.removeScenario(s.id);
        this.scenarios.splice(index, 1);
    }
}
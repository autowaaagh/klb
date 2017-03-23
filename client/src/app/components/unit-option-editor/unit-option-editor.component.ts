import { Http } from '@angular/http';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';

import { ArmyList, Unit, UnitOption, DataLoader, Nerve } from '../../model';

@Component({
    moduleId: module.id,
    selector: 'unit-option-editor',
    templateUrl: 'unit-option-editor.component.html'
})
export class UnitOptionEditorComponent implements OnInit {
    @Input() options: UnitOption[];
    oldOptions: UnitOption[];

    @Output() optionsChangedEvent = new EventEmitter();

    constructor() {
        this.options = [];
        this.oldOptions = [];
    }

    ngOnInit() { }

    ngDoCheck() {
        let hasChanged = false;
        if (this.options != undefined && this.options != null) {
            if (this.options.length < this.oldOptions.length) {
                hasChanged = true;
                this.oldOptions.splice(this.oldOptions.length - this.options.length);
            }

            this.options.forEach((o, i) => {
                if (i >= this.oldOptions.length) {
                    hasChanged = true;
                    this.oldOptions.push(o);
                }

                if (this.oldOptions[i].unitSize !== o.unitSize) {
                    hasChanged = true;
                    this.oldOptions[i].unitSize = o.unitSize;
                }

                if (this.oldOptions[i].modelCount !== o.modelCount) {
                    hasChanged = true;
                    this.oldOptions[i].modelCount = o.modelCount;
                }

                if (this.oldOptions[i].sp !== o.sp) {
                    hasChanged = true;
                    this.oldOptions[i].sp = o.sp;
                }

                if (this.oldOptions[i].me !== o.me) {
                    hasChanged = true;
                    this.oldOptions[i].me = o.me;
                }

                if (this.oldOptions[i].ra !== o.ra) {
                    hasChanged = true;
                    this.oldOptions[i].ra = o.ra;
                }

                if (this.oldOptions[i].de !== o.de) {
                    hasChanged = true;
                    this.oldOptions[i].de = o.de;
                }

                if (this.oldOptions[i].at !== o.at) {
                    hasChanged = true;
                    this.oldOptions[i].at = o.at;
                }

                if (this.oldOptions[i].nv == undefined) {
                    this.oldOptions[i].nv = new Nerve();
                }

                if (this.oldOptions[i].nv.waver !== o.nv.waver) {
                    hasChanged = true;
                    this.oldOptions[i].nv.waver = o.nv.waver;
                }

                if (this.oldOptions[i].nv.route !== o.nv.route) {
                    hasChanged = true;
                    this.oldOptions[i].nv.route = o.nv.route;
                }

                if (this.oldOptions[i].pts !== o.pts) {
                    hasChanged = true;
                    this.oldOptions[i].pts = o.pts;
                }
            });

        }
        if (hasChanged) {
            this.optionsChanged();
        }
    }

    optionsChanged() {
        console.log('emit options-changed event');
        this.optionsChangedEvent.emit();
    }

    addUnitOption() {
        if (this.options == undefined) {
            this.options = [];
        }

        let o = {
            unitSize: 'Troop',
            modelCount: '10',
            sp: '5',
            me: '4',
            ra: '-',
            de: '3',
            at: '10',
            nv: {
                    waver: '10',
                route: '12'
            },
            pts: '100'
        }

        this.options.push(Object.assign(new UnitOption(), o));
    }

    removeUnitOption(index: number) {

        if (index != undefined && index > -1) {
            this.options.splice(index, 1);
        }
    }
}
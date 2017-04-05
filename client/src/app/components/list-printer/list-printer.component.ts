import { Http } from '@angular/http';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Directive } from '@angular/core';

import { ArmyList, Unit, UnitOption, Artefact, UnitUpgrade, Modifier, OutputDescription } from '../../model';

declare let jsPDF: any;
declare let html2canvas: any;
declare let autoTable: any;

@Component({
    moduleId: module.id,
    selector: 'list-printer',
    templateUrl: 'list-printer.component.html',
    styles: [
        '.printable { background-color: #fff; padding: 15px}',
        'table { width: 600px; table-layout: fixed; } ',
        '.tbl-top-bar { width: 600px; }',
        '.unit-stats-row td:nth-of-type(even) { background-color: #eee }',
        '.table-header {background-color: #ccc; font-weight: bold }',
        '.tbl-list td:not(:first-child):not(:last-child) { text-align:center; }',
        '.special-rules { font-style: italic; font-size: 8pt }',
        'button {  display: inline-block; width: 100%; box-shadow: none;  border-radius: 0px; cursor: default;}',
        '.btn-flat { background-color: #007ACC; color: #fff; border: none; }',
        '.btn-flat:hover { background-color: #0069BB; }',
        '.btn-remove-unit { background-color: #f00; color: #fff; }',
        '.btn-remove-unit:hover { background-color: #d00; }',
        '.unit-sub-row { margin-left: 10px; }',
        '.list-total-points { text-align: right; align: right; }',
        '.artefact-display { font-weight: bold; }',
        '.descriptions-name {   font-weight: bold; }',
        '.descriptions-desc {  }',
        '.big-col { width: 33%; text-align:left; }',
        '.med-col { width: 40px; }'
    ]
})
export class ListPrinterComponent implements OnInit {
    isShown: boolean = false;
    armyList = new ArmyList();
    descList: OutputDescription[] = [];
    descriptions: OutputDescription[] = [];
    @ViewChild('printable') printDiv: any;

    constructor(private http: Http) {
        this.http.get('data/special-rules.json')
            .subscribe(res => {
                let json = res.json();

                for (var i = 0; i < json.length; i++) {
                    var obj = json[i];
                    let od: OutputDescription = Object.assign(new OutputDescription(), obj);
                    this.descList.push(od);
                }
            });
    }

    ngOnInit() { }

    ngAfterViewInit() { }

    outputList(list: ArmyList) {
        this.armyList = list;
        this.populateArtefactDescriptions();
        this.populateSpecialDescriptions();

        // this.isShown = true;
        // setTimeout(() => {
        // let html = this.printDiv.nativeElement;
        let filename: string = list.name + '_' + list.points;

        var doc = new jsPDF();

        var text = list.name + ' (' + list.points + ')';
        doc.text(text, 10, 10);

        let attribStyle: any = {
            columnWidth: 8,
            halign: 'center'
        };
        doc.autoTable(this.getColumns(), this.getData(), {
            theme: 'striped',
            styles: {
                overflow: 'linebreak',
            },
            columnStyles: {
                unit: { columnWidth: 60 },
                sp: attribStyle,
                me: attribStyle,
                ra: attribStyle,
                de: attribStyle,
                at: attribStyle,
                nv: { columnWidth: 12, halign: 'center' },
                pts: { columnWidth: 12, halign: 'center' },
                special: { columnWidth: 60, fontStyle: 'italic', fontSize: 8 },
            }
        });
        doc.autoTable(this.getDescColumns(), this.getDescData(), {
            theme: 'striped',
            startY: doc.autoTableEndPosY() + 50,
            styles: {
                overflow: 'linebreak',
                fontSize: 8
            },
            columnStyles: {
                name: { columnWidth: 60, fontStyle: 'bold' }
            }
        });
        doc.save(filename + '.pdf');
        // });
    }

    getColumns() {
        return [
            { title: "Unit", dataKey: "unit" },
            { title: "Sp", dataKey: "sp" },
            { title: "Me", dataKey: "me" },
            { title: "Ra", dataKey: "ra" },
            { title: "De", dataKey: "de" },
            { title: "At", dataKey: "at" },
            { title: "Nv", dataKey: "nv" },
            { title: "Pts", dataKey: "pts" },
            { title: "Special Rules", dataKey: "special" },
        ];
    }

    getData() {
        let data: any = [];

        this.armyList.units.forEach((u, i) => {
            let specials: string[] = [];

            specials.push(u.unitType);
            if (u.artefact && u.artefact.name != '- Artefacts -') {
                specials.push(u.artefact.name);
            }
            if (u.piercing > 0) {
                specials.push('Piercing (' + u.piercing + ')');
            }
            if (u.cs > 0) {
                specials.push('Crushing Strength (' + u.cs + ')');
            }
            if (u.tc > 0) {
                specials.push('Thunderous Charge (' + u.tc + ')');
            }
            u.special.forEach((s, si) => {
                specials.push(s);
            });

            let special: string = '';
            specials.forEach((s, si, arr) => {
                special += s;
                if (si != arr.length - 1) {
                    special += ', ';
                }
            });

            data.push({
                unit: u.name + '  (' + u.unitOptions[0].unitSize + ')',
                sp: u.unitOptions[0].sp,
                me: this.attribDisplay(u.unitOptions[0].me),
                ra: this.attribDisplay(u.unitOptions[0].ra),
                de: this.attribDisplay(u.unitOptions[0].de),
                at: u.unitOptions[0].at,
                nv: u.unitOptions[0].nv.waver + '/' + u.unitOptions[0].nv.route,
                pts: u.unitOptions[0].pts,
                special: special
            });
        });

        return data;
    }

    attribDisplay(s: string): string {
        if (s === '-') {
            return s;
        } else {
            return s + '+';
        }
    }

    getDescColumns() {
        return [
            { title: "Name", dataKey: "name" },
            { title: "Description", dataKey: "desc" }
        ];
    }

    getDescData() {
        let data: any = [];

        this.descriptions.forEach((d, i) => {
            data.push({
                name: d.name,
                desc: d.desc
            });
        });

        return data;
    }

    descriptionsContain(s: string): boolean {
        let result: boolean = false;
        if (this.descriptions) {
            this.descriptions.forEach((d, i) => {
                if (d.name == s) {
                    result = true;
                }
            });
        }

        return result;
    }

    generalizeParensDesc(s: string): string {
        let desc = s;

        var regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(desc);

        if (matches) {
            if (matches.length > 1) {
                desc = desc.replace(matches[1], 'x');
            }
        }

        return desc;
    }

    populateSpecialDescriptions() {
        let specialDescs: string[] = [
            'Piercing (x)',
            'Crushing Strength (x)',
            'Thunderous Charge (x)'
        ];

        specialDescs.forEach((s, i) => {
            let od = new OutputDescription();
            od.name = s;
            od.desc = '';

            this.descriptions.push(od);
        });

        this.armyList.units.forEach((u, i) => {
            u.special.forEach((s, si) => {
                let desc = this.generalizeParensDesc(s);
                let x = this.descriptionsContain(desc);
                if (!x) {
                    let od = new OutputDescription();
                    od.name = desc;
                    od.desc = '';

                    this.descriptions.push(od);
                }
            });
        });

        this.descriptions.forEach((d, i) => {
            if (d.desc === '') {
                this.descList.forEach((l, li) => {
                    if (d.name === l.name) {
                        d.desc = l.desc;
                    }
                });
            }
        });
    }

    populateArtefactDescriptions() {
        this.armyList.units.forEach((u, i) => {
            if (u.artefact && u.artefact.name != '- Artefacts -') {
                let od = new OutputDescription();
                od.name = u.artefact.name;
                od.desc = u.artefact.description;

                this.descriptions.push(od);
            }
        });
    }
}
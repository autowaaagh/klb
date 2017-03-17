"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var model_1 = require('../../model');
var ListPrinterComponent = (function () {
    function ListPrinterComponent(http) {
        var _this = this;
        this.http = http;
        this.isShown = false;
        this.armyList = new model_1.ArmyList();
        this.descList = [];
        this.descriptions = [];
        this.http.get('data/special-rules.json')
            .subscribe(function (res) {
            var json = res.json();
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                var od = Object.assign(new model_1.OutputDescription(), obj);
                _this.descList.push(od);
            }
        });
    }
    ListPrinterComponent.prototype.ngOnInit = function () { };
    ListPrinterComponent.prototype.ngAfterViewInit = function () { };
    ListPrinterComponent.prototype.outputList = function (list) {
        this.armyList = list;
        this.populateArtefactDescriptions();
        this.populateSpecialDescriptions();
        // this.isShown = true;
        // setTimeout(() => {
        // let html = this.printDiv.nativeElement;
        var filename = list.name + '_' + list.points;
        var doc = new jsPDF();
        var text = list.name + ' (' + list.points + ')';
        doc.text(text, 10, 10);
        var attribStyle = {
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
    };
    ListPrinterComponent.prototype.getColumns = function () {
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
    };
    ListPrinterComponent.prototype.getData = function () {
        var _this = this;
        var data = [];
        this.armyList.units.forEach(function (u, i) {
            var specials = [];
            specials.push(u.type);
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
            u.special.forEach(function (s, si) {
                specials.push(s);
            });
            var special = '';
            specials.forEach(function (s, si, arr) {
                special += s;
                if (si != arr.length - 1) {
                    special += ', ';
                }
            });
            data.push({
                unit: u.name + '  (' + u.unitOptions[0].unitSize + ')',
                sp: u.unitOptions[0].sp,
                me: _this.attribDisplay(u.unitOptions[0].me),
                ra: _this.attribDisplay(u.unitOptions[0].ra),
                de: _this.attribDisplay(u.unitOptions[0].de),
                at: u.unitOptions[0].at,
                nv: u.unitOptions[0].nv.waver + '/' + u.unitOptions[0].nv.route,
                pts: u.unitOptions[0].pts,
                special: special
            });
        });
        return data;
    };
    ListPrinterComponent.prototype.attribDisplay = function (s) {
        if (s === '-') {
            return s;
        }
        else {
            return s + '+';
        }
    };
    ListPrinterComponent.prototype.getDescColumns = function () {
        return [
            { title: "Name", dataKey: "name" },
            { title: "Description", dataKey: "desc" }
        ];
    };
    ListPrinterComponent.prototype.getDescData = function () {
        var data = [];
        this.descriptions.forEach(function (d, i) {
            data.push({
                name: d.name,
                desc: d.desc
            });
        });
        return data;
    };
    ListPrinterComponent.prototype.descriptionsContain = function (s) {
        var result = false;
        if (this.descriptions) {
            this.descriptions.forEach(function (d, i) {
                if (d.name == s) {
                    result = true;
                }
            });
        }
        return result;
    };
    ListPrinterComponent.prototype.generalizeParensDesc = function (s) {
        var desc = s;
        var regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(desc);
        if (matches) {
            if (matches.length > 1) {
                desc = desc.replace(matches[1], 'x');
            }
        }
        return desc;
    };
    ListPrinterComponent.prototype.populateSpecialDescriptions = function () {
        var _this = this;
        var specialDescs = [
            'Piercing (x)',
            'Crushing Strength (x)',
            'Thunderous Charge (x)'
        ];
        specialDescs.forEach(function (s, i) {
            var od = new model_1.OutputDescription();
            od.name = s;
            od.desc = '';
            _this.descriptions.push(od);
        });
        this.armyList.units.forEach(function (u, i) {
            u.special.forEach(function (s, si) {
                var desc = _this.generalizeParensDesc(s);
                var x = _this.descriptionsContain(desc);
                if (!x) {
                    var od = new model_1.OutputDescription();
                    od.name = desc;
                    od.desc = '';
                    _this.descriptions.push(od);
                }
            });
        });
        this.descriptions.forEach(function (d, i) {
            if (d.desc === '') {
                _this.descList.forEach(function (l, li) {
                    if (d.name === l.name) {
                        d.desc = l.desc;
                    }
                });
            }
        });
    };
    ListPrinterComponent.prototype.populateArtefactDescriptions = function () {
        var _this = this;
        this.armyList.units.forEach(function (u, i) {
            if (u.artefact && u.artefact.name != '- Artefacts -') {
                var od = new model_1.OutputDescription();
                od.name = u.artefact.name;
                od.desc = u.artefact.description;
                _this.descriptions.push(od);
            }
        });
    };
    __decorate([
        core_1.ViewChild('printable'), 
        __metadata('design:type', Object)
    ], ListPrinterComponent.prototype, "printDiv", void 0);
    ListPrinterComponent = __decorate([
        core_1.Component({
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
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ListPrinterComponent);
    return ListPrinterComponent;
}());
exports.ListPrinterComponent = ListPrinterComponent;
//# sourceMappingURL=list-printer.component.js.map
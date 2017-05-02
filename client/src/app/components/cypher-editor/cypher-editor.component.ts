import { Component, OnInit } from '@angular/core';

import { Cypher } from "../../model";
import { FileLoaderService } from "../../services/file-loader.service";

@Component({
	moduleId: module.id,
	selector: 'cypher-editor',
	templateUrl: 'cypher-editor.component.html',
	providers: [FileLoaderService]
})

export class CypherEditorComponent implements OnInit {
	cyphers: Cypher[] = [];

	constructor(private fl: FileLoaderService) {
		this.loadCyphers();
	}

	ngOnInit() { }

	loadCyphers() {
		this.fl.getCyphers((res) => {
			let json = res.json();

			for (var i = 0; i < json.length; i++) {
				var obj = json[i];
				let c = this.loadCypher(obj);
				this.cyphers.push(c);
			}
		});
	}

	loadCypher(json: JSON): Cypher {
		let c = new Cypher();
		c.name = json['name'];
		c.desc = json['desc'];
		c.level = json['level'];
		c.id = json['_id'];

		return c;
	}

	update(index: number) {
		let c = this.cyphers[index];
		this.fl.updateCypher(c.id, c);
	}

	createCypher() {
		let c = new Cypher();
		c.name = "New Cypher";
		c.level = '';
		c.desc = '';
		c.source = '';

		this.fl.createNewCypher(c, (res) => {
			let data = res.json();
			c.id = data._id;

			this.cyphers.push(c);
		});
	}

	remove(index: number) {
		let c = this.cyphers[index];
		this.fl.removeCypher(c.id);
		this.cyphers.splice(index, 1);
	}
}
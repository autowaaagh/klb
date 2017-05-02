import { Component, OnInit } from '@angular/core';

import { Cypher } from "../../model";
import { FileLoaderService } from "../../services/file-loader.service";

@Component({
	moduleId: module.id,
	selector: 'cyphers-view',
	templateUrl: 'cyphers-view.component.html',
	providers: [FileLoaderService],
	styleUrls: ['cyphers-view.component.css']
})

export class CyphersViewComponent implements OnInit {
	cyphers: Cypher[] = [];
	letters: string[] = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));
	selectedCypher: Cypher = new Cypher();

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
		c.source = json['source'];

		return c;
	}

	public test() {
		window.open("cypher");
	}
	
	select(index: number) {
		if (name !== undefined && name > -1) {
			this.selectedCypher = this.cyphers[index];
		}
	}
}
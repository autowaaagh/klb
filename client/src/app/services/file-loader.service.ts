import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FileLoaderService {

    constructor(private http: Http) { }

    protected readAll(url: string, callback?: ((response: Response) => void)) {
        this.http.get('api/' + url + '/')
            .subscribe(res => {
                if (callback != undefined) {
                    callback(res);
                }
            })
    }

    protected readSingle(url: string, id: string, callback?: ((response: Response) => void)) {
        this.http.get('api/' + url + '/' + id)
            .subscribe(res => {
                if (callback != undefined) {
                    callback(res);
                }
            })
    }

    protected create(url: string, data: any, callback?: ((response: Response) => void)) {
        this.http.post('api/' + url + '/', data)
            .subscribe(res => {
                if (callback != undefined) {
                    callback(res);
                }
            })
    }

    protected update(url: string, id: string, data: any, callback?: ((response: Response) => void)) {
        this.http.put('api/' + url + '/' + id, data)
            .subscribe(res => {
                if (callback != undefined) {
                    callback(res);
                }
            })
    }

    protected remove(url: string, id: string, callback?: ((response: Response) => void)) {
        this.http.delete('api/' + url + '/' + id)
            .subscribe(res => {
                if (callback != undefined) {
                    callback(res);
                }
            })
    }

    //==================== ARMIES ====================//
    getArmies(callback?: ((response: Response) => void)) {
        this.readAll('army', callback);
    }

    getArmy(id: string, callback?: ((response: Response) => void)) {
        this.readSingle('army', id, callback);
    }

    createNewArmy(data: any, callback?: ((response: Response) => void)) {
        this.create('army', data, callback);
    }

    updateArmy(id: string, data: any, callback?: ((response: Response) => void)) {
        this.update('army', id, data, callback);
    }

    removeArmy(id: string, callback?: ((response: Response) => void)) {
        this.remove('army', id, callback);
    }

    //==================== ARTEFACTS ====================//
    getArtefacts(callback?: ((response: Response) => void)) {
        this.readAll('artefact', callback);
    }

    getArtefact(id: string, callback?: ((response: Response) => void)) {
        this.readSingle('artefact', id, callback);
    }

    createNewArtefact(data: any, callback?: ((response: Response) => void)) {
        this.create('artefact', data, callback);
    }

    updateArtefact(id: string, data: any, callback?: ((response: Response) => void)) {
        this.update('artefact', id, data, callback);
    }

    removeArtefact(id: string, callback?: ((response: Response) => void)) {
        this.remove('artefact', id, callback);
    }

    //==================== SPECIAL RULES ====================//
    getSpecialRules(callback?: ((response: Response) => void)) {
        this.readAll('specialrule', callback);
    }

    getSpecialRule(id: string, callback?: ((response: Response) => void)) {
        this.readSingle('specialrule', id, callback);
    }

    createNewSpecialRule(data: any, callback?: ((response: Response) => void)) {
        this.create('specialrule', data, callback);
    }

    updateSpecialRule(id: string, data: any, callback?: ((response: Response) => void)) {
        this.update('specialrule', id, data, callback);
    }

    removeSpecialRule(id: string, callback?: ((response: Response) => void)) {
        this.remove('specialrule', id, callback);
    }

    //==================== SPECIAL RULES ====================//
    getScenarios(callback?: ((response: Response) => void)) {
        this.readAll('scenario', callback);
    }

    getScenario(id: string, callback?: ((response: Response) => void)) {
        this.readSingle('scenario', id, callback);
    }

    createNewScenario(data: any, callback?: ((response: Response) => void)) {
        this.create('scenario', data, callback);
    }

    updateScenario(id: string, data: any, callback?: ((response: Response) => void)) {
        this.update('scenario', id, data, callback);
    }

    removeScenario(id: string, callback?: ((response: Response) => void)) {
        this.remove('scenario', id, callback);
    }

    //==================== CYPHER RULES ====================//
    getCyphers(callback?: ((response: Response) => void)) {
        this.readAll('cypher', callback);
    }

    getCypher(id: string, callback?: ((response: Response) => void)) {
        this.readSingle('cypher', id, callback);
    }

    createNewCypher(data: any, callback?: ((response: Response) => void)) {
        this.create('cypher', data, callback);
    }

    updateCypher(id: string, data: any, callback?: ((response: Response) => void)) {
        this.update('cypher', id, data, callback);
    }

    removeCypher(id: string, callback?: ((response: Response) => void)) {
        this.remove('cypher', id, callback);
    }
}
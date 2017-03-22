import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FileLoaderService {

    constructor(private http: Http) { }

    writeFile(name: string, data: any, callback?: ((response: Response) => void)) {
        this.http.post('/' + name, data)
            .subscribe(res => {
                if (callback != undefined) {
                    callback(res);
                }
            });
    }

    deleteFile(name: string, callback?: ((response: Response) => void)) {
        this.http.delete('/' + name)
            .subscribe(res => {
                if (callback != undefined) {
                    callback(res);
                }
            });
    }

    getFile(name: string, callback?: ((response: Response) => void)) {
        this.http.get(name)
            .subscribe(res => {
                if (callback != undefined) {
                    callback(res);
                }
            });
    }
}
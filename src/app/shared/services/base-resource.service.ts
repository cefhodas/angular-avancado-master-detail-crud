import { BaseResourceModel } from "../model/base-resource.model";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injector } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

export abstract class BaseResourceService<T extends BaseResourceModel>{
    protected http: HttpClient;
    constructor(protected apiPath: string,
                protected injector: Injector){  
        this.http = injector.get(HttpClient) ;     
    }
    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResources)
        );
    }
    getById(id: number): Observable<T> {
        const url: string = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResource)
        );
    }
    create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResource)
        );
    }
    update(resource: T): Observable<T> {
        const url: string = `${this.apiPath}/${resource.id}`;
        return this.http.put(url, resource).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResource)
        );
    }
    delete(id: number): Observable<any> {
        const url: string = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
            catchError(this.handleError),
            map(() => null)
        );
    }
    //PROTECTED
    protected jsonDataToResources(jsoonData: any[]): T[] {
        const resources: T[] = [];
        jsoonData.forEach(element => resources.push(element as T));
        return resources;
    }
    protected jsonDataToResource(jsoonData: any): T {
        return jsoonData as T;
    }
    protected handleError(error: any): Observable<any> {
        console.log("Erro na requisição => ", error);
        return throwError(error);
    }
}
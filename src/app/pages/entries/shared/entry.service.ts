import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Observable, throwError, from } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";
import { Entry } from "./entry.model";


@Injectable({
  providedIn: 'root'
})
export class EntryService {
  
  private apiPath: string = "http://localhost:3000/entries";
  constructor(private http: HttpClient,
    ) {
    
  }
  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    );
  }
  getById(id: number): Observable<Entry> {
    const url: string = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    );
  }
  create(entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath, entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    );
  }
  update(entry: Entry): Observable<Entry> {
    const url: string = `${this.apiPath}/${entry.id}`;
    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    );
  }
  delete(id: number): Observable<any> {
    const url: string = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  //PRIVATE
  private jsonDataToEntries(jsoonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsoonData.forEach(element => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry)
    });

    return entries;
  }
  private jsonDataToEntry(jsoonData: any): Entry {
    return Object.assign(new Entry(), jsoonData);
  }
  private handleError(error: any): Observable<any> {
    console.log("Erro na requisição => ", error);
    return throwError(error);
  }
}

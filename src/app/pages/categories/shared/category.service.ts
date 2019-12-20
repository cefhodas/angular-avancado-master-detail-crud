import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler} from "@angular/common/http";
import { Observable, throwError, from} from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";
import { Category } from "./category.model";
import { CategoryFormComponent } from '../category-form/category-form.component';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiPath: string = "http://localhost:3000/categories";
  constructor(private http: HttpClient) { }
  getAll(): Observable<Category[]>{
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    );
  }
  getById(id:number): Observable<Category>{
    const url: string = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );
  }
  create(category: Category): Observable<Category>{
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );
  }
  update(category:Category): Observable<Category>{
    const url: string = `${this.apiPath}/${category.id}`;
    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );
  }
  delete(id: number): Observable<any>{
    const url: string = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  //PRIVATE
  private jsonDataToCategories(jsoonData: any[]): Category[]{
    const categories: Category[] = [];
    jsoonData.forEach(element => categories.push(element as Category));
    return categories;
  }
  private jsonDataToCategory(jsoonData: any): Category{
    return jsoonData as Category;
  }
  private handleError(error: any): Observable<any>{
    console.log("Erro na requisição => ", error);
    return throwError(error);
  }
}

import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from "./category.model";
import { BaseResourceService } from "../../../shared/services/base-resource.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {

  constructor(protected injector: Injector) { 
    super("http://localhost:3000/categories", injector)
  }
  

  
}

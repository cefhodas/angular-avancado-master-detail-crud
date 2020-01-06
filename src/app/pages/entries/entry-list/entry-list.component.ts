import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { from } from 'rxjs';
import { element } from 'protractor';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {
  public listaCategorias: Category[] = [];
  entries: Entry[] = [];
  constructor(private entryService: EntryService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll()
    .subscribe(
      (categories) => {
        this.listaCategorias = categories
        this.entryService.getAll().subscribe(
          entries => {
            this.entries = entries
            this.entries.forEach(item => {
              item.category = this.listaCategorias.find(x=> x.id == item.categoryId);
            })
          },
          error => alert("Erro ao carregar a lista de lançamentos")
        );
      },
      (error) => {
        alert("Erro ao carregar a lista de lançamentos")
      }

    )


  }
  deleteEntry(entry: Entry) {
    const mustDelete = confirm('Deseja realmente excluir o item');
    if (mustDelete) {
      this.entryService.delete(entry.id).subscribe(
        () => this.entries =  this.entries.filter(element => element != entry),
        () => alert('Erro ao tentar excluir')
      )
    }
  }

}

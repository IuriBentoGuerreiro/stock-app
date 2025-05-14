import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  pageSize = 12;
  currentPage = 0;

  @Input() totalElements!: number;
  @Output() pageChange = new EventEmitter<PageEvent>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.paginator) {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalElements;
      }
    });
  }

  onPageChange(event: PageEvent) {
    console.log('Evento de Paginação Disparado:', event);
    this.pageChange.emit(event);
  }
}
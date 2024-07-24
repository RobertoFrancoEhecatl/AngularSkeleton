import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-table',
  templateUrl: './skeleton-table.component.html',
  styleUrls: ['./skeleton-table.component.scss']
})
export class SkeletonTableComponent {
  rowIndices: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]; // Números de filas
  colIndices: any[] = [{class: 'col-1'}, {class: 'col-3'}, {class: 'col-5'}, {class: 'col-3'}]; // Números de columnas
}

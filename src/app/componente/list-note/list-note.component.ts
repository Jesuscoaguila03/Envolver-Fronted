import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {Note} from '../../model/Note';
import {NoteService} from '../../services/note.service';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {DatePipe} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import{
  MatDialog,
} from "@angular/material/dialog";


import {ConfirmarDialogoComponent} from './confirmar-dialogo/confirmar-dialogo.component';

@Component({
  selector: 'app-list-note',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    DatePipe,
    MatSort,
    MatSortHeader,
    MatButton,
    RouterLink
  ],
  templateUrl: './list-note.component.html',
  styleUrl: './list-note.component.css'
})
export class ListNoteComponent implements OnInit, AfterViewInit {
  lista: Note[] = [];
  displayedColumns = ['idNote', 'description', 'category', 'archived', 'accion01', 'accion02'];
  dataSource: MatTableDataSource<Note> = new MatTableDataSource<Note>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  noteService: NoteService = inject(NoteService);
  route: Router = inject(Router);
  dialog=inject(MatDialog);

  constructor() {
    console.log('Load constructor');
  }

  ngAfterViewInit():void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void{
    console.log('Load List');
    this.noteService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadlista();
  }

  loadlista():void {
    this.noteService.list().subscribe({
      next: (data) => {
        this.noteService.setList(data);//sent new list
      },
      error: (error)=>console.log("Error in query", error)
    })
  }

  openDialog(id:number){
    const dialogRef = this.dialog.open(ConfirmarDialogoComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.delete(id);
      }else{
        console.log("Dialogue responded do not delete");
      }
    });
  }

  delete(id:number) {
    this.noteService.delete(id).subscribe(() => {
      this.noteService.list().subscribe(data => {
        this.noteService.setList(data);//sent new list
      });
    });
  }
}




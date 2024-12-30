import { Routes } from '@angular/router';
import {NewNoteComponent} from './componente/new-note/new-note.component';
import {ListNoteComponent} from './componente/list-note/list-note.component';

export const routes: Routes = [
  { path: 'notes', component: ListNoteComponent},
  { path: 'new-note', component: NewNoteComponent},
  { path: 'note-edit/:id', component: NewNoteComponent},
];

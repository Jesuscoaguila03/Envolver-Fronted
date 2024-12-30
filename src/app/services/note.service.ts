import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Note} from '../model/Note';
import {environment} from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private url = environment.apiUrl
  private http: HttpClient = inject(HttpClient); //new HttpClient()
  private listaCambio: Subject<Note[]> = new Subject<Note[]>();
  constructor() { }

  list(): Observable<any> {
    return this.http.get<Note[]>(this.url + "/notes");
  }

  listID(id: number): Observable<any> {
    return this.http.get<Note[]>(this.url + "/note/" + id);
  }

  insert(note: Note): Observable<any> {
    return this.http.post(this.url + "/note", note);
  }

  update(note: Note): Observable<any> {
    return this.http.put(this.url + "/note", note);
  }

  delete(id: number){
    return this.http.delete(this.url + "/note/" + id);
  }

  setList(listaNueva: Note[]){
    this.listaCambio.next(listaNueva); //sent new list
  }

  getList(){
    return this.listaCambio.asObservable();
  }
}

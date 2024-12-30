import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NoteService} from '../../services/note.service';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {Note} from '../../model/Note';
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatSelect} from '@angular/material/select';


@Component({
  selector: 'app-new-note',
  standalone: true,
  imports: [MatCard,
    MatCardContent,
    MatCardTitle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatHint,
    MatLabel,
    ReactiveFormsModule,
    MatDatepickerModule,//add
    MatNativeDateModule, //add
    MatInputModule,
    MatButton, MatSelect, MatOption,
    //add
  ],
  templateUrl: './new-note.component.html',
  styleUrl: './new-note.component.css'
})
export class NewNoteComponent {
  noteForm: FormGroup;
  fb= inject(FormBuilder);

  noteService: NoteService = inject(NoteService);
  router: Router = inject(Router);
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    console.log("Constructor NewNoteComponent")
    this.noteForm = this.fb.group({
      idNote: [''],
      description: ['', Validators.required],
      category: ['', Validators.required],
      archived: ['', Validators.required],
    })
  }

  ngOnInit():void {
    this.route.params.subscribe((data: Params) => {
      console.log("ngOnInit de NewNoteComponent");
      console.log(data);
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.cargarForm();
    });
  }

  cargarForm() {
    if(this.edicion){
      this.noteService.listID(this.id).subscribe((data: Note) =>{
        console.log(data);
        this.noteForm.patchValue( {
          description: data.description,
          category: data.category,
          archived: data.archived
        })
      })
    }
  }

  onSubmit(){
    if(this.noteForm.valid){
      const note: Note = new Note();
      note.idNote = this.id;
      note.description = this.noteForm.value.description;
      note.category = this.noteForm.value.category;
      note.archived = this.noteForm.value.archived;

      if(!this.edicion){
        console.log("Data entered: ", note);
        this.noteService.insert(note).subscribe((data: object): void =>{
          console.log("Inserted data:", data);
        })
      }else{
        console.log("Data entered: ", note);
        this.noteService.update(note).subscribe((data: Object): void =>{
          console.log("Updated data:", data);
        })
      }
      this.router.navigate(['notes']);
    }else {
      console.log("Invalid form");
    }
  }
}

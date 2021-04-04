import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-measure',
  templateUrl: './new-measure.component.html',
  styleUrls: ['./new-measure.component.css'],
})
export class NewMeasureComponent implements OnInit {
  newMeasureForm!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newMeasureForm = this.formBuilder.group({
      clef: [null, Validators.required],
      timeSignature: [null, Validators.required],
    });
  }
}

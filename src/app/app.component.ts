import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  dismissType: boolean = false;

  @ViewChild('dismiss', { static: false }) inputRef!: ElementRef;

  ngOnInit() {
    this.form = new FormGroup({
      dataLayer: new FormControl(),
      darkMode: new FormControl(),
      primaryColor: new FormControl('#146EFF', [Validators.required]),
      borderRadius: new FormControl(null, [Validators.required]),
      dismissable: new FormControl(false),
      dismissType: new FormControl(''),
      expiration: new FormControl('', [Validators.required]),
      closeType: new FormControl(''),
    });
  }

  hadleDismissType() {
    this.dismissType = !this.dismissType;
  }

  submit() {
    if (this.form.valid) {
      console.log('Form: ', this.form);
      const formData = { ...this.form.value };
      console.log('Form Data:', formData);
    }
  }
}

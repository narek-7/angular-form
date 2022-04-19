import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  closeConsentBar: boolean = false;
  dismissText: string = '';
  isDisgusting: boolean = false;
  dismissType: string = 'cross';

  @ViewChild('dismiss', { static: false }) inputRef!: ElementRef;

  ngOnInit() {
    this.form = new FormGroup({
      dataLayer: new FormControl(),
      darkMode: new FormControl(null),
      primaryColor: new FormControl('#146EFF', [Validators.required]),
      borderRadius: new FormControl('', [Validators.required]),
      dismissable: new FormControl(true),
      dismissType: new FormControl('cross'),
      expiration: new FormControl('', [Validators.required]),
      closeType: new FormControl(''),
    });
  }

  hadleClose() {
    const formData = { ...this.form.value };
    if (formData.expiration) {
      this.inputRef.nativeElement.style.display = 'none';
    }
  }

  handleDismissType() {
    if (this.dismissText) {
      this.dismissType = this.dismissText;
    } else if (this.isDisgusting) {
      this.dismissType = 'cross-faint';
    } else {
      this.dismissType = 'cross';
    }
  }

  hadleDisgusting() {
    this.isDisgusting = !this.isDisgusting;
    this.dismissText = '';
  }

  hadleDismissText(event: any) {
    this.dismissText = event.target.value;
  }

  submit() {
    const formData = { ...this.form.value };

    if (this.form.valid) {
      this.handleDismissType();
      if (formData.darkMode === null) {
        delete formData.darkMode;
      } else {
        formData.darkMode = !!formData.darkMode;
      }
      if (!formData.closeType) {
        delete formData.closeType;
      }

      if (!formData.dataLayer) {
        delete formData.dataLayer;
      }
      formData.dismissable = this.dismissType === 'cross' ? true : false;
      formData.dismissType = this.dismissType;

      console.log(formData);
    }
  }
}

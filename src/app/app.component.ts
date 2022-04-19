import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.form = new FormGroup({
      dataLayer: new FormControl(),
      darkMode: new FormControl(null),
      primaryColor: new FormControl('', [Validators.required]),
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

  handleResetForm() {
    this.inputRef.nativeElement.style.display = 'block';
    this.dismissText = '';
    this.dismissType = 'cross';
    this.closeConsentBar = false;
    this.isDisgusting = false;
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
      this.handleResetForm();
      this.form.reset();
      console.log(formData);

      this.http.put<JSON>(
        'https://fenarek.blob.core.windows.net/narek/assets/options.json',
        JSON.stringify(formData),
        {
          headers: new HttpHeaders({
            'x-ms-blob-type': 'BlockBlob',
          }),
        }
      );
    }
  }
}

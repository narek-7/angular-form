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
  showAlert: boolean = false;

  @ViewChild('dismiss', { static: false }) inputRef!: ElementRef;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.form = new FormGroup({
      dataLayer: new FormControl(),
      darkMode: new FormControl(null),
      primaryColor: new FormControl('', [Validators.required]),
      borderRadius: new FormControl('', [Validators.required,Validators.min(1)]),
      dismissable: new FormControl(true),
      dismissType: new FormControl('cross'),
      expiration: new FormControl('', [Validators.required, Validators.min(1)]),
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
    this.form.reset();
  }

  hadleDisgusting() {
    this.isDisgusting = !this.isDisgusting;
    this.dismissText = '';
  }

  hadleDismissText(event: any) {
    this.dismissText = event.target.value;
  }

  getData() {
    const data = localStorage.getItem('formData');
    console.log(data ? JSON.parse(data) : {});
  }

  saveData(formData: object) {
    localStorage.setItem('formData', JSON.stringify(formData));
  }

  handleAlertMessage() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 2000);
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
      this.saveData(formData);
      this.handleAlertMessage();
    }
  }
}

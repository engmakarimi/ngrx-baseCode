import { BackendErrors } from './../../types/backendError';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'backend-error-message',
  templateUrl: './backend-error-message.component.html',
  styleUrls: ['./backend-error-message.component.scss']
})
export class BackendErrorMessageComponent implements OnInit {
 @Input() errorMessage:BackendErrors |null={};
  constructor() { }

  ngOnInit() {
    console.log('BackendErrorMessageComponent')
    console.log(this.errorMessage);
  }

}

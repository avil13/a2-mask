import { A2MaskDirective } from './../a2/a2-mask/a2-mask.directive';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inst = `...

// Import a2 directive
import { A2MaskDirective } from 'a2-mask';

// Set options if you  want
A2MaskDirective.setOptions({
  number_delimiter: '\\'',
  phone: '+7 (999) 999-99-99',
  date: '9999-99-99'
});

@NgModule({
  declarations: [
    ...
    A2MaskDirective // Include a2 directive
  ],
  imports: [
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
  `;



  num = `<input type="text" [a2-mask]="'number'">`;

  date = `<input type="text" [a2-mask]="'date'">`;

  phone = `<input type="text" [a2-mask]="'phone'">`;

  pattern = `
9 // digits 0-9
A // a-z & A-Z 
S // a-z & A-Z & 0-9

<input type="text" [a2-mask]="{pattern: '9-xxx-A-S'}">
`;

}

import { Component } from '@angular/core';

// Decorator
@Component({
  selector: 'app-root', // element-selector
  templateUrl: 'app.component.html', // html
  styleUrls: ['app.component.scss'], // css -- optional
})
export class AppComponent {
  // ts
  constructor() {}
}

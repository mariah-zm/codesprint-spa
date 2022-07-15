import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {
  @Input() isCentered: boolean = true;
}

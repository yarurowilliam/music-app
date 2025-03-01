import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Library Component</div>`,
  styles: []
})
export class LibraryComponent {}

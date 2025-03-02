import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from '@core/services/error.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (error(); as errorState) {
      <div class="fixed top-4 right-4 p-4 rounded shadow-lg animate-fade-in"
           [ngClass]="getBackgroundClass(errorState.type)">
        <div class="flex items-center gap-2">
          <span class="material-icons">{{getIcon(errorState.type)}}</span>
          <p class="text-white">{{errorState.message}}</p>
        </div>
      </div>
    }
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.3s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ToastComponent {
  private errorService = inject(ErrorService);
  error = this.errorService.error;

  getBackgroundClass(type: string): string {
    switch (type) {
      case 'error': return 'bg-red-600';
      case 'warning': return 'bg-yellow-600';
      default: return 'bg-blue-600';
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return 'info';
    }
  }
}

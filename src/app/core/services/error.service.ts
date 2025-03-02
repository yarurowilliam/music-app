import { Injectable, signal } from '@angular/core';

export interface ErrorState {
  message: string;
  type: 'error' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorState = signal<ErrorState | null>(null);
  error = this.errorState.asReadonly();

  showError(message: string): void {
    this.errorState.set({ message, type: 'error' });
    setTimeout(() => this.clearError(), 5000);
  }

  showWarning(message: string): void {
    this.errorState.set({ message, type: 'warning' });
    setTimeout(() => this.clearError(), 5000);
  }

  clearError(): void {
    this.errorState.set(null);
  }
}

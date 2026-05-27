import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../loading.service';

@Component({
    selector: 'app-service-unavailable',
    standalone: true,
    imports: [],
    templateUrl: './service-unavailable.component.html',
    styleUrl: './service-unavailable.component.css'
})
export class ServiceUnavailableComponent {
  readonly isRetrying = signal<boolean>(false);

  constructor(
    private readonly router: Router,
    private readonly loadingService: LoadingService
  ) {}

  retry() {
    this.isRetrying.set(true);
    this.loadingService.show();
    this.router.navigate(['/dashboard']).then(() => {
      this.isRetrying.set(false);
      this.loadingService.hide();
    });
  }
}

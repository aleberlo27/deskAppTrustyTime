import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CompanyResponse } from '../../models/company-response.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NavBarComponent, AsyncPipe],
  templateUrl: './dashboard.coponent.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  authService = inject(AuthService);
  // Utilizamos el observable para suscribirnos a los datos de la empresa
  company$: Observable<CompanyResponse | null> = this.authService.company$;

}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TCommonWords } from '../../../../core/types/common-words.type';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { CompanyResponse } from '../../../models/company-response.interface';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [CardModule, ButtonModule, DividerModule, TranslatePipe, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  translateService = inject(TranslateService);
  router = inject(Router);
  authService = inject(AuthService);  // Inyectamos el servicio de autenticación

  //Usamos el computed para obtener los datos de la empresa logueada
  // get company() {
  //   return this.authService.company();
  // }

  // Utilizamos el observable para suscribirnos a los datos de la empresa
  company$: Observable<CompanyResponse | null> = this.authService.company$;

  get commonWords(): TCommonWords {
    return this.translateService.instant('commonWords');
  }

  logOut() {
    this.authService.logOut();
  }
}

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
import { AsyncPipe, CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-home',
  imports: [CardModule, ButtonModule, DividerModule, TranslatePipe,AsyncPipe, ToastModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  messageService = inject(MessageService);
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

  public copyToClipboard(text: string | undefined) {
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    this.messageService.add({
      severity: 'success',
      summary: this.translateService.instant('commonWords.copy'),
      detail: this.translateService.instant('commonWords.textCopied', { text })
    });
  }).catch(() => {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: this.translateService.instant('commonWords.textNotCopied')
    });
  });
}

  logOut() {
    this.authService.logOut();
  }
}

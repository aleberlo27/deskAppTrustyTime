import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TCommonWords } from '../../../core/types/common-words.type';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [ButtonModule,Dialog,TranslatePipe,FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  router = inject(Router);
  translateService = inject(TranslateService);
  authService = inject(AuthService);
  error = signal(false);
  messageService = inject(MessageService);

  email: string = '';
  password: string = '';

  get commonWords(): TCommonWords{
    return this.translateService.instant('commonWords');
  }

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  closeDialog() {
      this.visible = false;
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(success => {
      if (success) {
        this.router.navigateByUrl('dashboard');
      } else {
        this.error.set(true);
        this.router.navigateByUrl('login');
        this.messageService.add({
          severity: 'error',
          summary: 'Error al iniciar sesión',
          detail: 'Las credenciales proporcionadas son incorrectas.',
          life: 3000  // Duración en milisegundos
        });
      }
    });
  }
}

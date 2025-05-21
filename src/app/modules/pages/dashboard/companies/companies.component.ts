import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TCommonWords } from '../../../../core/types/common-words.type';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CompanyResponse } from '../../../models/company-response.interface';
import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-companies',
  imports: [
    TableModule,
    TagModule,
    RatingModule,
    SelectModule,
    ButtonModule,
    CommonModule,
    ScrollPanelModule,
    ToastModule,
    TranslatePipe,
    DialogModule,
    FormsModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesComponent implements OnInit {
  translateService = inject(TranslateService);
  authService = inject(AuthService);
  companyService = inject(CompanyService);
  messageService = inject(MessageService);
  router = inject(Router);
  loading = signal(true);

  companyDialogVisible = signal(false);
  companyData: Company = {
    id: '',
    companyCode: '',
    name: '',
    email: '',
    password: '',
    role: 2, // Por defecto, el valor de rol es 2
    img: '', // Imagen de la empresa (si es necesario)
  };

  companies: CompanyResponse[] = [];

  get commonWords(): TCommonWords {
    return this.translateService.instant('commonWords');
  }

  ngOnInit() {
    this.loading.set(true);
    this.authService.getAllCompanies().subscribe({
      next: (companies) => {
      (this.companies = companies),
      this.loading.set(false);
      },
      error: (err) =>{
        console.error('Error al cargar compañías', err),
        this.loading.set(false);
      }
    });
  }

  // Mostrar el diálogo para agregar compañía
  showCompanyDialog() {
    this.companyDialogVisible.set(true);
  }

  // Guardar la compañía
  saveCompany() {
    if (
      !this.companyData.name ||
      !this.companyData.companyCode ||
      !this.companyData.email ||
      !this.companyData.password
    ) {
      // Si algún campo está vacío, muestra el Toast con el mensaje de error
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos.',
      });
      return;
    }
    if (
      this.companyData.name &&
      this.companyData.companyCode &&
      this.companyData.email &&
      this.companyData.password
    ) {
      this.companyService.addCompany(this.companyData).subscribe((response) => {
        console.log('Compañía agregada exitosamente', response);
        this.companyDialogVisible.set(false);
        // Limpiar el formulario
        this.companyData = {
          id: '',
          companyCode: '',
          name: '',
          email: '',
          password: '',
          role: 2,
          img: '',
        };
      });
    }
  }
  // Método para actualizar la lista de empresas
  refreshCompanies() {
    this.loading.set(true);
    setTimeout(() => {
      this.authService.getAllCompanies().subscribe({
        next: (companies) => {
          this.companies = companies;
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error al actualizar las compañías', err);
          this.loading.set(false);
        }
      });
    }, 2000);
  }
}

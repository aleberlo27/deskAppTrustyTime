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
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { WorkerService } from '../../../services/worker.service';

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
    ConfirmDialogModule,
    ProgressSpinnerModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesComponent implements OnInit {
  translateService = inject(TranslateService);
  authService = inject(AuthService);
  companyService = inject(CompanyService);
  workerService = inject(WorkerService);
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
    password2: '',
    role: 2,
    img: '',
  };

  companies: CompanyResponse[] = [];

  constructor(private confirmationService: ConfirmationService) {}

  get commonWords(): TCommonWords {
    return this.translateService.instant('commonWords');
  }

  confirmDelete(companyCode: string) {
    this.confirmationService.confirm({
      message: this.translateService.instant(
        'commonWords.confirmDeleteMessage'
      ),
      header: this.translateService.instant('commonWords.confirmDelete'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteCompany(companyCode);
      },
    });
  }

  ngOnInit() {
    this.loading.set(true);
    this.authService.getAllCompanies().subscribe({
      next: (companies) => {
        (this.companies = companies), this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
      },
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
      !this.companyData.password ||
      !this.companyData.password2
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: this.translateService.instant('commonWords.notCompleteFields'),
      });
      return;
    }

    if (this.companyData.password !== this.companyData.password2) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: this.translateService.instant('commonWords.passwordMismatch'),
      });
      return;
    }

    this.companyService.addCompany(this.companyData).subscribe((response) => {
      this.companyDialogVisible.set(false);
      this.refreshCompanies();
      this.messageService.add({
        severity: 'success',
        summary: this.translateService.instant('commonWords.success'),
        detail: this.translateService.instant('commonWords.addCompanyComplete'),
      });
      this.companyData = {
        id: '',
        companyCode: '',
        name: '',
        email: '',
        password: '',
        password2: '',
        role: 2,
        img: '',
      };
    });
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
          this.loading.set(false);
        },
      });
    }, 2000);
  }

  deleteCompany(companyCode: string) {
    this.companyService.deleteCompany(companyCode).subscribe({
      next: () => {
        this.workerService.deleteWorkersByCompanyCode(companyCode).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('commonWords.success'),
              detail: this.translateService.instant(
                'commonWords.deleteCompanyComplete'
              ),
            });

            this.companies = this.companies.filter(
              (c) => c.companyCode !== companyCode
            );
          },
          error: () => {
            this.messageService.add({
              severity: 'warn',
              summary: 'Advertencia',
              detail: this.translateService.instant('commonWords.companyDeleteNotWorkers'),
            });
          },
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.translateService.instant('commonWords.deleteCompany'),
        });
      },
    });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TCommonWords } from '../../../../core/types/common-words.type';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {
  Schedule,
  WorkerResponse,
} from '../../../models/worker-response.interface';
import { WorkerService } from '../../../services/worker.service';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-workers',
  imports: [
    TableModule,
    TagModule,
    RatingModule,
    ConfirmDialog,
    SelectModule,
    ProgressSpinnerModule,
    ButtonModule,
    CommonModule,
    ScrollPanelModule,
    ToastModule,
    TranslatePipe,
    DialogModule,
  ],
  templateUrl: './workers.component.html',
  styleUrl: './workers.component.css',
  providers: [MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkersComponent {
  translateService = inject(TranslateService);
  private authService = inject(AuthService);
  private workerService = inject(WorkerService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  router = inject(Router);

  get commonWords(): TCommonWords {
    return this.translateService.instant('commonWords');
  }

  workers: WorkerResponse[] = [];
  dialogVisible: boolean = false; // Para abrir/cerrar el diálogo
  selectedWorker: WorkerResponse | null = null; // Para almacenar el trabajador seleccionado
  selectedWorkerName: string = '';
  selectedSchedules: Schedule[] = [];
  loading = signal(false);

  ngOnInit() {
    const companyCode = this.authService.companyCode(); // Obtenido del signal
    if (companyCode) {
      this.workerService.getWorkersByCompanyCode(companyCode).subscribe({
        next: (workers) => {
          this.workers = this.sortWorkersByShift(workers);
        },
        error: (err) => {
          console.error('Error al obtener trabajadores:', err);
        },
      });
    }
  }

  //Función para ordenar los trabajadores por si están en turno
  private sortWorkersByShift(workers: WorkerResponse[]): WorkerResponse[] {
    return workers.sort((a, b) => {
      const aInTurn = this.isWorkingNow(a);
      const bInTurn = this.isWorkingNow(b);

      //Los que están en turno deben ir primero
      if (aInTurn && !bInTurn) {
        return -1;
      } else if (!aInTurn && bInTurn) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  isWorkingNow(worker: WorkerResponse): boolean {
    if (!worker || !worker.schedules || worker.schedules.length === 0) {
      return false;
    }

    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = this.formatTime(now);
    const currentMinutes = this.timeToMinutes(currentTime);

    for (let schedule of worker.schedules) {
      if (schedule.date !== currentDate) continue;

      const startMinutes = this.timeToMinutes(schedule.start);
      const endMinutes = this.timeToMinutes(schedule.end);

      const isOvernight = endMinutes < startMinutes;

      if (
        (!isOvernight &&
          currentMinutes >= startMinutes &&
          currentMinutes <= endMinutes) ||
        (isOvernight &&
          (currentMinutes >= startMinutes || currentMinutes <= endMinutes))
      ) {
        return true;
      }
    }

    return false;
  }

  deleteWorker(id: string) {
    this.confirmationService.confirm({
      message: this.translateService.instant(
        'commonWords.confirmDeleteMessageWorker'
      ),
      header: this.translateService.instant('commonWords.confirmDelete'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translateService.instant('commonWords.accept'),
      rejectLabel: this.translateService.instant('commonWords.cancel'),
      accept: () => {
        this.workerService.deleteWorkerById(id).subscribe({
          next: () => {
            this.workers = this.workers.filter((worker) => worker.id !== id);
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('commonWords.success'),
              detail: this.translateService.instant(
                'commonWords.deleteWorkerComplete'
              ),
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('commonWords.error'),
              detail: this.translateService.instant('commonWords.deleteWorker'),
            });
          },
        });
      },
    });
  }

  private formatTime(date: Date): string {
    return date.toTimeString().slice(0, 5); //"HH:mm"
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  openSchedulesDialog(worker: WorkerResponse) {
    const workerId = worker.id;

    this.selectedWorker = worker;
    this.dialogVisible = true;

    this.workerService.getSchedulesByWorkerId(workerId).subscribe({
      next: (response) => {
        this.selectedWorkerName = response.name;
        this.selectedSchedules = this.sortSchedules(response.schedules);
      },
      error: (err) => {
        console.error('Error al obtener horarios del trabajador:', err);
      },
    });
  }

  // Función para ordenar los horarios por fecha y hora de inicio
  private sortSchedules(schedules: Schedule[]): Schedule[] {
    return schedules.sort((a, b) => {
      // Primero comparar por fecha (de más reciente a más antigua)
      if (a.date !== b.date) {
        return b.date.localeCompare(a.date); // b.date primero para que el más reciente esté arriba
      }

      // Si las fechas son iguales, comparar por la hora de inicio (de más reciente a más antigua)
      const aStartTime = this.timeToMinutes(a.start);
      const bStartTime = this.timeToMinutes(b.start);
      return bStartTime - aStartTime; // bStartTime primero para que el más reciente esté arriba
    });
  }

  refreshWorkers() {
    this.chargeWorkers();
  }

  chargeWorkers() {
    this.loading.set(true);
    const companyCode = this.authService.companyCode();
    if (companyCode) {
      setTimeout(() => {
        this.workerService.getWorkersByCompanyCode(companyCode).subscribe({
          next: (workers) => {
            this.workers = this.sortWorkersByShift(workers);
            this.loading.set(false);
          },
          error: (err) => {
            this.loading.set(false);
          },
        });
      }, 2000);
    }
  }
}

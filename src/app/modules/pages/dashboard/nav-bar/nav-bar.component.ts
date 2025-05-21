import { ChangeDetectionStrategy, Component, inject, Input, input, OnChanges } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MenubarModule } from 'primeng/menubar';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [ MenubarModule, TabsModule, CommonModule, RouterOutlet, TranslatePipe],
  templateUrl:'./nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnChanges {
  @Input() role: number = 0;
  translateService = inject(TranslateService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  selectedTabIndex: string = 'home';

  // tabs = [
  //   { titleKey: 'commonWords.home', path: 'home'},
  //   { titleKey: 'commonWords.workers', path: 'workers' },
  //   { titleKey: 'commonWords.companies', path: 'companies' }
  // ];

  tabs: { titleKey: string; path: string }[] = [];

  ngOnChanges() {
    if (this.role === 1) {
      this.tabs = [
        { titleKey: 'commonWords.home', path: 'home' },
        { titleKey: 'commonWords.companies', path: 'companies' }
      ];
    } else if (this.role === 2) {
      this.tabs = [
        { titleKey: 'commonWords.home', path: 'home' },
        { titleKey: 'commonWords.workers', path: 'workers' }
      ];
    } else {
      // Redirigir al login si el rol no es válido
      this.router.navigate(['/login']);
    }
  }


  constructor() {
    //Escuchar cambios en la URL y actualizar selectedTabIndex
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url;
      if (url.includes('workers')) {
        this.selectedTabIndex = 'workers';
      } else if (url.includes('companies')) {
        this.selectedTabIndex = 'companies';
      } else {
        this.selectedTabIndex = 'home';
      }
    });
  }

  //Actualiza la ruta cuando el valor de la pestaña cambie
  ngDoCheck() {
    if (this.selectedTabIndex) {
      this.router.navigate([this.selectedTabIndex], { relativeTo: this.route });
    }
  }
}

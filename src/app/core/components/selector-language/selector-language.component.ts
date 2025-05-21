import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TLanguages } from '../../types/languajes.types';

@Component({
  selector: 'app-selector-language',
  imports: [CommonModule],
  templateUrl: './selector-language.component.html',
  styleUrl: './selector-language.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorLanguageComponent {
  languages: TLanguages = ['es', 'en'];
  currentLang = signal('es');

  constructor(private translate: TranslateService) {
    this.currentLang.set(this.translate.currentLang|| 'es');
  }

  changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;
    this.translate.use(lang);
    this.currentLang.set(lang);
  }

}

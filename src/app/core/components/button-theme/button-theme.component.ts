import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button-theme',
  imports: [ButtonModule],
  templateUrl: './button-theme.component.html',
  styleUrl: './button-theme.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonThemeComponent {
// Estado reactivo para saber si está en modo oscuro
isDarkTheme = signal(true);

toggleDarkMode() {
  const element = document.querySelector('html');
  const newValue = !this.isDarkTheme();
  this.isDarkTheme.set(newValue);

  if (newValue) {
    element?.classList.add('dark-theme');
  } else {
    element?.classList.remove('dark-theme');
  }
}
}

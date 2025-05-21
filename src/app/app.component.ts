import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonThemeComponent } from "./core/components/button-theme/button-theme.component";
import { SelectorLanguageComponent } from "./core/components/selector-language/selector-language.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, ToggleSwitchModule, RouterOutlet, ButtonThemeComponent, SelectorLanguageComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'deskApp';
}

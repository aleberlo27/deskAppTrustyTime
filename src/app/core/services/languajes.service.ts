import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class LanguajesService {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|es/) ? browserLang : 'es');
  }

}

import { ApplicationConfig, enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// AngularFire imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


// Other module imports
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideToastr } from 'ngx-toastr';
import { provideStore, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { rootReducer } from './recruiter/store';
import { FilemanagerEffects } from './recruiter/store/filemanager/filemanager.effects';
import { OrderEffects } from './recruiter/store/orders/order.effects';
import { AuthenticationEffects } from './recruiter/store/Authentication/authentication.effects';
import { CartEffects } from './recruiter/store/Cart/cart.effects';
import { ProjectEffects } from './recruiter/store/ProjectsData/project.effects';
import { usersEffects } from './recruiter/store/UserGrid/user.effects';
import { userslistEffects } from './recruiter/store/UserList/userlist.effect';
import { JoblistEffects } from './recruiter/store/Job/job.effects';
import { CandidateEffects } from './recruiter/store/Candidate/candidate.effects';
import { InvoiceDataEffects } from './recruiter/store/Invoices/invoice.effects';
import { ChatEffects } from './recruiter/store/Chat/chat.effect';
import { tasklistEffects } from './recruiter/store/Tasks/tasks.effect';
import { OrdersEffects } from './recruiter/store/Crypto/crypto.effects';
import { CustomerEffects } from './recruiter/store/customer/customer.effects';
import { MailEffects } from './recruiter/store/Email/email.effects';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    [provideRouter(routes)],
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideStore(rootReducer),
    provideEffects(
      [
        FilemanagerEffects,
        OrderEffects,
        AuthenticationEffects,
        CartEffects,
        ProjectEffects,
        usersEffects,
        userslistEffects,
        JoblistEffects,
        CandidateEffects,
        InvoiceDataEffects,
        ChatEffects,
        tasklistEffects,
        OrdersEffects,
        CustomerEffects,
        MailEffects
      ]
    ),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      }),
    ),
    provideAnimations(),
    provideToastr(),
    { provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } },
    
  ]
};


import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './recruiter/extrapages/page404/page404.component';

/*import { AuthGuard } from './candidate/core/guards/auth.guard';
import { LayoutComponent } from './candidate/layouts/layout.component';
import { Page404Component } from './candidate/extrapages/page404/page404.component';*/

export const routes: Routes = [
    {
        path: "candidate",
        loadChildren: () =>
            import("./candidate/recruiter.module").then((m) => m.RecruiterModule),
    },
    {
        path: "recruiter",
        loadChildren: () =>
            import("./recruiter/recruiter.module").then((m) => m.RecruiterModule),
    },
    
    
{ path: "**", component: Page404Component }
];

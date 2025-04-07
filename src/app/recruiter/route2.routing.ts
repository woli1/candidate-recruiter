import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruiterComponent } from './recruiter.component';

export const routes: Routes = [

    {
        path: '',component:RecruiterComponent,
        children:[{path:'pages',loadChildren: () =>
            import('./pages/pages.module').then((m) => m.PagesModule)}]
        
      }

    ]

    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
      })
      export class RecruiteRoutingModule { }
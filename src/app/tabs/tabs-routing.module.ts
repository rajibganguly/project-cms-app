import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../dashboard/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../projects/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'employees',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../employees/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'payments',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../payments/tab4.module').then(m => m.Tab4PageModule)
          }
        ]
      },
      {
        path: 'create',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../create/create.module').then(m => m.CreatePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

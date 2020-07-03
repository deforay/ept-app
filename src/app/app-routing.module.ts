import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'dts-hiv-serology',
    loadChildren: () => import('./dts-hiv-serology/dts-hiv-serology.module').then( m => m.DTSHIVSerologyPageModule)
  },
  {
    path: 'dts-hiv-viralload',
    loadChildren: () => import('./dts-hiv-viralload/dts-hiv-viralload.module').then( m => m.DtsHivViralloadPageModule)
  },
  {
    path: 'all-pt-schemes',
    loadChildren: () => import('./all-pt-schemes/all-pt-schemes.module').then( m => m.AllPTSchemesPageModule)
  },
  {
    path: 'individual-report',
    loadChildren: () => import('./individual-report/individual-report.module').then( m => m.IndividualReportPageModule)
  },
  {
    path: 'summary-report',
    loadChildren: () => import('./summary-report/summary-report.module').then( m => m.SummaryReportPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'app-password',
    loadChildren: () => import('./app-password/app-password.module').then( m => m.AppPasswordPageModule)
  },
  {
    path: 'dbs-eid',
    loadChildren: () => import('./dbs-eid/dbs-eid.module').then( m => m.DbsEidPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'enter-app-password',
    loadChildren: () => import('./enter-app-password/enter-app-password.module').then( m => m.EnterAppPasswordPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'sync-all-shipments',
    loadChildren: () => import('./sync-all-shipments/sync-all-shipments.module').then( m => m.SyncAllShipmentsPageModule)
  },
  {
    path: 'rapid-hiv-recency-testing',
    loadChildren: () => import('./rapid-hiv-recency-testing/rapid-hiv-recency-testing.module').then( m => m.RapidHIVRecencyTestingPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

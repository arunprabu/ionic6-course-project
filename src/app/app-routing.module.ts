import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// routes config
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
  }
];

@NgModule({
  imports: [
    // registering the routes
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) // preloads all modules as quickly as possible.
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

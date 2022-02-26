import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShortUrlComponent } from './Components/short-url/short-url.component';
import { ShowUrlComponent } from './Components/show-url/show-url.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shortner',
    pathMatch: 'full',
  },
  {
    path: 'shortner',
    component: ShortUrlComponent,
  },
  {
    path: ':id',
    component: ShowUrlComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

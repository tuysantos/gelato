import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteComponent } from './components/quote/quote.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'quote', component: QuoteComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '/login', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

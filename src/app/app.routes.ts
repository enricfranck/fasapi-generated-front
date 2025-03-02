import { Routes } from '@angular/router';
import { ProjectComponent } from './pages/project/project.component';
import { ConfigComponent } from './pages/config/config.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'project', component: ProjectComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'home', component: HomeComponent },
];

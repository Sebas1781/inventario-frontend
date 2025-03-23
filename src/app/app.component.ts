import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // IMPORTANTE: Incluir RouterModule en 'imports' para usar <router-outlet> y [routerLink]
  imports: [RouterModule],
  template: `

    <!-- Aquí se mostrarán las vistas definidas en app.routes.ts -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}

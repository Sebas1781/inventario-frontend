import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // IMPORTANTE: Incluir RouterModule en 'imports' para usar <router-outlet> y [routerLink]
  imports: [RouterModule],
  template: `
    <h1>Bienvenido a Inventario</h1>
    <nav>
      <a routerLink="/productos">Lista de productos</a>
      <a routerLink="/productos/nuevo">Nuevo producto</a>
    </nav>
    <hr>
    <!-- Aquí se mostrarán las vistas definidas en app.routes.ts -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}

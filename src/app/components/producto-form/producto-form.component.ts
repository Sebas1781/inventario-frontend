import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService, Producto } from '../../services/producto.service';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  form!: FormGroup;
  editMode = false;
  productoId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      disponible: [true],
      categoria: ['', Validators.required]
    });

    // Revisar si la URL tiene un :id para modo edición
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.editMode = true;
        this.productoId = +idParam;
        // Cargar datos
        this.productoService.getProducto(this.productoId).subscribe(p => {
          this.form.patchValue(p);
        });
      }
    });
  }

  onGuardar() {
    if (this.form.invalid) return;

    const producto: Producto = this.form.value;

    if (this.editMode) {
      // Actualizar
      this.productoService.actualizarProducto(this.productoId, producto)
        .subscribe(() => this.router.navigate(['/productos']));
    } else {
      // Crear
      this.productoService.crearProducto(producto)
        .subscribe(() => this.router.navigate(['/productos']));
    }
  }
}

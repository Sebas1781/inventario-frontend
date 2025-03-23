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

  // Variables para mostrar textos dinámicos en el encabezado y botón
  title: string = 'Nuevo Producto';
  description: string = 'Ingresa los datos del producto';
  titleBtn: string = 'Guardar';

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

    // Verificar si la ruta tiene un parámetro "id" para modo edición
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.editMode = true;
        this.productoId = +idParam;
        this.title = 'Editar Producto';
        this.titleBtn = 'Actualizar';
        this.description = 'Modifica la información del producto';
        // Cargar los datos del producto a editar
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
      // Actualizar el producto
      this.productoService.actualizarProducto(this.productoId, producto)
        .subscribe(() => this.router.navigate(['/productos']));
    } else {
      // Crear un nuevo producto
      this.productoService.crearProducto(producto)
        .subscribe(() => this.router.navigate(['/productos']));
    }
  }

  // Método para regresar al listado de productos
  regresar() {
    this.router.navigate(['/productos']);
  }
}

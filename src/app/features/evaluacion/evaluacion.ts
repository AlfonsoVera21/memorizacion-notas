import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';


import { CatalogoObservacion, EstadoRespuesta, MuestraEvaluacion } from '../../core/models/evaluacion.model';
import { Evaluaciones } from '../../core/services/evaluaciones';

import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { RadioButton } from 'primeng/radiobutton';


@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    DatePickerModule,
    TableModule,
    ButtonModule,
    RadioButton,
    AutoCompleteModule
  ],
  templateUrl: './evaluacion.html',
  styleUrl: './evaluacion.css',
})

export class Evaluacion {

  pruebaId = 'GUID-DE-TU-PRUEBA';
  form: FormGroup;
  estadosFiltrados: any[] = [];
  filaActivaIndex: number | null = null;
  observacionesFiltradas: CatalogoObservacion[] = [];


  muestras: MuestraEvaluacion[] = [
    { muestraId: '1',  codigoMuestra: '137' },
    { muestraId: '2',  codigoMuestra: '653' },
    { muestraId: '3',  codigoMuestra: '733' },
    { muestraId: '4',  codigoMuestra: '657' },
    { muestraId: '5',  codigoMuestra: '738' },
    { muestraId: '6',  codigoMuestra: '655' }
  ];

  estados = [
    { label: 'Dentro', value: 'Dentro' },
    { label: 'Fuera', value: 'Fuera' }
  ];

  observacionesCatalogo: CatalogoObservacion[] = [
    { id: 1, nombre: 'Clorofenol - Medicinal' },
    { id: 2, nombre: 'Sulfuroso' },
    { id: 3, nombre: 'Metálico' },
    { id: 4, nombre: 'Terroso - Geosmina' },
    { id: 5, nombre: 'Moho' },
    { id: 6, nombre: 'Acetaldehído' },
    { id: 7, nombre: 'Plástico' },
    { id: 8, nombre: 'Caramelo Quemado' },
    { id: 9, nombre: 'Hexanoato de Etilo' },
    { id: 10, nombre: 'Fermentado' }
  ];

  constructor(
    private fb: FormBuilder,
    private evaluacionesService: Evaluaciones
  ) {
    this.form = this.fb.group({
      cedula     : ['', Validators.required],
      nombre     : ['', Validators.required],
      fecha      : ['', Validators.required],
      producto   : ['', Validators.required],
      respuestas : this.fb.array([])
    });

    this.initRespuestas();
  }

  get respuestas(): FormArray {
    return this.form.get('respuestas') as FormArray;
  }

  private initRespuestas(): void {
    this.muestras.forEach(m => {

      const grupo = this.fb.group({
        muestraId   : [m.muestraId],
        respuesta   : [null, Validators.required],
        observacion : [{ value: null, disabled: true }]
      });

      const respuestaCtrl   = grupo.get('respuesta')!;
      const observacionCtrl = grupo.get('observacion')!;

      respuestaCtrl.valueChanges.subscribe((estado: string | null) => {

        if (estado === 'Fuera') {
          observacionCtrl.enable({ emitEvent: false });
          observacionCtrl.setValidators([Validators.required]);
        } else {
          observacionCtrl.reset();
          observacionCtrl.clearValidators();
          observacionCtrl.disable({ emitEvent: false });
        }

        observacionCtrl.updateValueAndValidity({ emitEvent: false });
      });

      this.respuestas.push(grupo);
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.respuestas.controls.forEach((grupo: AbstractControl) => {
        grupo.markAllAsTouched();
      });
      return;
    }

    const payload = {
      pruebaId   : this.pruebaId,
      nombre     : this.form.value.nombre,
      respuestas : this.form.value.respuestas
    };

    this.evaluacionesService.registrarEvaluacion(payload)
      .subscribe(res => {
        alert(`Puntaje: ${res.puntajeTotal}%`);
      });
  }

  filtrarObservaciones(event: any): void {
    const query = event.query.toLowerCase();

    this.observacionesFiltradas = this.observacionesCatalogo.filter(o =>
      o.nombre.toLowerCase().includes(query)
    );
  }

}

export interface MuestraEvaluacion {
  muestraId     : string;
  codigoMuestra : string;
}

export interface RespuestaEvaluada {
  muestraId    : string;
  respuesta    : number;
  observacion? : string;
}

export interface RegistrarEvaluacionRequest {
  pruebaId   : string;
  nombre     : string;
  respuestas : RespuestaEvaluada[];
}

export interface RegistrarEvaluacionResponse {
  evaluacionId        : string;
  puntajeTotal        : number;
  totalMuestras       : number;
  respuestasCorrectas : number;
}

export interface EstadoRespuesta {
  label: string;
  value: string;
}

export interface CatalogoObservacion {
  id: number;
  nombre: string;
}

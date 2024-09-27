export interface Nota {
  id: number;
  fechaEntrega: string; 
  descripcion: string;
  nota: number;
  observaciones?: string;
}

export interface Materia {
    id: number;
    nombre: string;
    semestre: number;
    codigo: number;
    horario: string;
    observaciones?: string;
    notas?: Nota[];
  }

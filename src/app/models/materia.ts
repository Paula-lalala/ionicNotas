export interface Nota {
  id: number;
  fechaEntrega: string; 
  descripcion: string;
  nota: number;
  observaciones?: string;
  corte: number;
}

export interface Materia {
    id: number;
    nombre: string;
    semestre: number;
    codigo: number;
    horario: string;
    observaciones?: string;
    notas?: Nota[];
    promedioFinal?: number; 
    estado?: string;
  }

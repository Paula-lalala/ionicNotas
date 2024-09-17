export interface Materia {
    id: string; // Identificador único
    nombre: string;
    semestre: string;
    codigo: string;
    horario: string;
    observaciones?: string;
    notas: Nota[];
  }
  
  export interface Nota {
    id: string; // Identificador único
    fecha: string;
    descripcion: string;
    valor: number; // Entre 0 y 5
    observaciones?: string;
    corte: number; // 20% (1, 2, 3), 40% (4)
  }

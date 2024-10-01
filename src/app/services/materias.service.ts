import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Materia, Nota } from '../models/materia';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private materias: Materia[] = [];
  private ClaveStorage = 'materias';
  private ClaveNotaId = 'notaIdCounter';

  private materiasSubject = new BehaviorSubject<Materia[]>([]);
  materias$ = this.materiasSubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.storage = storage;
    await this.loadMaterias();
  }

  // MATERIA

  // Cargar materias al iniciar
  async loadMaterias() {
    const storedMaterias = await this.storage.get(this.ClaveStorage);
    this.materias = storedMaterias || [];
    this.materiasSubject.next(this.materias);
  }

  // Obtener materias
  async getMaterias(): Promise<Materia[]> {
    return this.materias;
  }

  // Añadir materia
  async addMateria(materia: Materia): Promise<boolean> {
    const materias = await this.getMaterias();
    const idRepetido = materias.some(m => m.id === materia.id);
    if (idRepetido) {
      return false; 
    }
    this.materias.push(materia);
    await this.updateStorage();
    return true; 
  }

  // Actualizar materia
  async updateMateria(materia: Materia) {
    const index = this.materias.findIndex(m => m.id === materia.id);
    if (index !== -1) {
      this.materias[index] = materia;
      await this.updateStorage();
    }
  }

  // Borrar materia
  async deleteMateria(id: number) {
    this.materias = this.materias.filter(m => m.id !== id);
    await this.updateStorage();
  }

  // Limpiar materias
  async clearMaterias() {
    this.materias = [];
    await this.storage.remove(this.ClaveStorage);
    await this.storage.remove(this.ClaveNotaId);
  }

  // NOTA

  // Añadir nota
  async addNota(materiaId: number, nota: Nota): Promise<void> {
    const materia = this.materias.find(m => m.id === materiaId);
    if (materia) {
        if (!materia.notas) {
            materia.notas = [];
        }
        nota.id = materia.notas.length > 0 ? materia.notas[materia.notas.length - 1].id + 1 : 1;
        materia.notas.push(nota);
        await this.updateMateria(materia);
    }
}

  // Obtener notas
  async getNotas(id: number): Promise<Nota[]> {
    await this.loadMaterias(); 
    const materia = this.materias.find(m => m.id === id);
    return materia && materia.notas ? materia.notas : [];
  }

  // actualizar nota
  async updateNota(id: number, nota: Nota): Promise<void> {
    await this.loadMaterias();
    const materia = this.materias.find(m => m.id === id);
    if (materia && materia.notas) {
        const notaIndex = materia.notas.findIndex(n => n.id === nota.id);
        
        if (notaIndex !== -1) {
            materia.notas[notaIndex] = { ...nota };
            await this.updateStorage();
            this.materiasSubject.next(this.materias);
        }
    }
}

  // Borrar nota
  async deleteNota(materiaId: number, notaId: number): Promise<void> {
    const materia = this.materias.find(m => m.id === materiaId);

    if (materia && materia.notas) {
      materia.notas = materia.notas.filter((nota: Nota) => nota.id !== notaId);
      await this.updateMateria(materia);
      this.materiasSubject.next(this.materias);
    }
  }

//  CALCULO PROMEDIO 
  async calcularPromedioFinal(materiaId: number): Promise<number> {
    const notas = await this.getNotas(materiaId);
    const cortes: { [key: number]: number[] } = { 1: [], 2: [], 3: [], 4: [] };
    notas.forEach(nota => {
        if (nota.corte >= 1 && nota.corte <= 4) {
            cortes[nota.corte].push(nota.nota);
        }
    });
    const promedios: number[] = [];
    for (let corte in cortes) {
        const notasCorte = cortes[corte];
        if (notasCorte.length > 0) {
            const sumaNotas = notasCorte.reduce((acc, nota) => acc + nota, 0);
            const promedioCorte = sumaNotas / notasCorte.length;
            promedios.push(promedioCorte);
        } else {
            promedios.push(0); // Si no hay notas, el promedio es 0
        }
    }
    const promedioFinal = (promedios[0] * 0.2) + (promedios[1] * 0.2) + (promedios[2] * 0.2) + (promedios[3] * 0.4);
    await this.actualizarPromedioMateria(materiaId, promedioFinal);
    return promedioFinal;
}

async actualizarPromedioMateria(materiaId: number, promedioFinal: number): Promise<void> {
  const materia = this.materias.find(m => m.id === materiaId); 
  if (materia) {
      materia.promedioFinal = promedioFinal; 
      await this.saveMateria(materia); 
  } else {
      console.error('Materia no encontrada con ID:', materiaId); 
  }
}

async saveMateria(materia: Materia): Promise<void> {
  const index = this.materias.findIndex(m => m.id === materia.id);
  if (index !== -1) {
      this.materias[index] = materia; 
      await this.updateStorage(); 
  } else {
      console.error('Materia no encontrada para actualizar:', materia.id); 
  }
}

async verificarEstadoMateria(materiaId: number): Promise<string> {
  const notas = await this.getNotas(materiaId);
  if (notas.length === 0) {
    return 'Sin notas';
  }

  const promedioFinal = await this.calcularPromedioFinal(materiaId);
  if (promedioFinal < 3.00) {
    return 'Perdió';
  } else {
    return 'Pasó';
  }
}

  private async updateStorage() {
    console.log('Actualizando almacenamiento con materias:', this.materias);
    await this.storage.set(this.ClaveStorage, this.materias);
}
}





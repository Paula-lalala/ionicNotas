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
  private ClaveNotaId = 'notaIdCounter'; // Clave para el contador de IDs de notas

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
  async addMateria(materia: Materia) {
    this.materias.push(materia);
    await this.updateStorage();
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
    await this.storage.remove(this.ClaveNotaId); // Limpiar contador de notas
  }

  // Añadir nota
  async addNota(materiaId: number, nota: Nota): Promise<void> {
    await this.loadMaterias();
    
    const materia = this.materias.find(m => m.id === materiaId);
    
    if (materia) {
      if (!materia.notas) {
        materia.notas = [];
      }

      nota.id = materia.notas.length > 0 ? materia.notas[materia.notas.length - 1].id + 1 : 1;

      materia.notas.push(nota);
      await this.updateMateria(materia);
      this.materiasSubject.next(this.materias);
    }
  }



  async getNotas(id: number): Promise<Nota[]> {
    await this.loadMaterias(); 
    const materia = this.materias.find(m => m.id === id);
    return materia && materia.notas ? materia.notas : [];
  }

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


  // Eliminar nota
  async deleteNota(materiaId: number, notaId: number): Promise<void> {
    const materia = this.materias.find(m => m.id === materiaId);

    if (materia && materia.notas) {
      materia.notas = materia.notas.filter((nota: Nota) => nota.id !== notaId);
      await this.updateMateria(materia);
      this.materiasSubject.next(this.materias);
    }
  }

  // Actualizar almacenamiento de materias
  private async updateStorage() {
    console.log('Actualizando almacenamiento con materias:', this.materias); // Agrega esto para verificar el contenido
    await this.storage.set(this.ClaveStorage, this.materias);
}
}





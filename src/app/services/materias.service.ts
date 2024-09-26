import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Materia } from '../models/materia';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private materias: Materia[] = [];
  private ClaveStorage = 'materias';

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

  async loadMaterias()  {
    let storedMaterias = await this.storage.get(this.ClaveStorage);
    this.materias = storedMaterias || [];
    this.materiasSubject.next(this.materias); 
  }

  async getMaterias(): Promise<Materia[]>{
    await this.loadMaterias();
    return this.materias;  }

  async addMateria(materia: Materia) {
    this.materias.push(materia);
    await this.storage.set(this.ClaveStorage, this.materias);
  }

  async updateMateria(materia: Materia) {
    const index = this.materias.findIndex(m => m.id === materia.id);
    if (index !== -1) {
      this.materias[index] = materia;
      await this.storage.set(this.ClaveStorage, this.materias);
    }
  }

  async deleteMateria(id: number) {
    this.materias = this.materias.filter(m => m.id !== id);
    await this.storage.set(this.ClaveStorage, this.materias);
  }

  async clearMaterias() {
    await this.storage.clear();
  }
}




import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Materia } from '../models/materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private materias: Materia[] = [];
  private ClaveStorage = 'materias';

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
  }

  async getMaterias(): Promise<Materia[]>{
    await this.loadMaterias();
    return this.materias;  }

  async addMateria(materia: Materia) {
    this.materias.push(materia);
    await this.storage.set(this.ClaveStorage, this.materias);
  }

  async clearMaterias() {
    await this.storage.clear();
  }
}




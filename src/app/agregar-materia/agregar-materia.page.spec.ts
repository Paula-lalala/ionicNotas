import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarMateriaPage } from './agregar-materia.page';

describe('AgregarMateriaPage', () => {
  let component: AgregarMateriaPage;
  let fixture: ComponentFixture<AgregarMateriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarMateriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

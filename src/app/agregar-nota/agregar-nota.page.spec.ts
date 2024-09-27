import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarNotaPage } from './agregar-nota.page';

describe('AgregarNotaPage', () => {
  let component: AgregarNotaPage;
  let fixture: ComponentFixture<AgregarNotaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarNotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

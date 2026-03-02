import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTransaccion } from './registrar-transaccion';

describe('RegistrarTransaccion', () => {
  let component: RegistrarTransaccion;
  let fixture: ComponentFixture<RegistrarTransaccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarTransaccion],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarTransaccion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaJogo } from './consulta-jogo';

describe('ConsultaJogo', () => {
  let component: ConsultaJogo;
  let fixture: ComponentFixture<ConsultaJogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaJogo],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaJogo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

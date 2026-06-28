import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTime } from './consulta-time';

describe('ConsultaTime', () => {
  let component: ConsultaTime;
  let fixture: ComponentFixture<ConsultaTime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaTime],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaTime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lembrando } from './lembrando';

describe('Lembrando', () => {
  let component: Lembrando;
  let fixture: ComponentFixture<Lembrando>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lembrando],
    }).compileComponents();

    fixture = TestBed.createComponent(Lembrando);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTime } from './cadastro-time';

describe('CadastroTime', () => {
  let component: CadastroTime;
  let fixture: ComponentFixture<CadastroTime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroTime],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroTime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

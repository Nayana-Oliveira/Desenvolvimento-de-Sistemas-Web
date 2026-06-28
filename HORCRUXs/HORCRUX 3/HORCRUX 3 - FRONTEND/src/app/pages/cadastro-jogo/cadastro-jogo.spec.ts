import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroJogo } from './cadastro-jogo';

describe('CadastroJogo', () => {
  let component: CadastroJogo;
  let fixture: ComponentFixture<CadastroJogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroJogo],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroJogo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
